/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { FILTER_TYPE } from 'src/constants/enums';
import useFilters from 'src/hooks/useFilters';
import useLocales from 'src/hooks/useLocales';
import TableHeaderAutocomplete from 'src/hooks/TableHeaderAutocomplete';
import useInitialRenderState from './useInitialRenderState';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { deserializeFilters } from 'src/utils/urlFilterSerializer';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

TableHeader.propTypes = {
  onFilterChanges: PropTypes.func,
  config: PropTypes.object,
  subject: PropTypes.string,
};

export default function TableHeader({ onFilterChanges, config, subject }) {
  const queryParamFilters = useMemo(
    () => deserializeFilters(subject),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { filters, onFieldValueChanges, appliedFilters, resetFilters } =
    useFilters(config, queryParamFilters);
  const { translate, translateBackend } = useLocales();
  const isMount = useInitialRenderState();

  const tabFilters = filters.filter(
    (filter) => filter.type === FILTER_TYPE.TAB
  );
  const otherFilters = filters.filter(
    (filter) => filter.type !== FILTER_TYPE.TAB
  );

  const tabFiltersExist = Array.isArray(tabFilters) && tabFilters.length > 0;
  const otherFiltersExist =
    Array.isArray(otherFilters) && otherFilters.length > 0;

  const [openExtendedFilters, setOpenExtendedFilters] = useState(false);

  const onChanges = (filterId, newValue, apply) => {
    onFieldValueChanges(filterId, newValue, apply);
  };
  const renderFilters = (filters) =>
    filters.map((filter) => {
      if (!filter) return null;
      const renderChildFilters = () =>
        Array.isArray(filter.child) &&
        filter.child.length > 0 &&
        filter.value &&
        !['All', 'all', '*'].includes(filter.value) &&
        renderFilters(
          filter.child.filter(
            (child) =>
              !child.displayOn ||
              child.displayOn(Object.fromEntries(appliedFilters || []))
          )
        );

      return (
        <Fragment key={filter.id}>
          <Grid
            item
            xs={filter.size.xs}
            sm={filter.size.sm}
            md={filter.size.md}
            lg={filter.size.lg}
            className="maxWidth"
          >
            {/* Render parent filter based on its type */}
            {filter.type === FILTER_TYPE.TAB && (
              <Tabs
                allowScrollButtonsMobile
                variant="scrollable"
                scrollButtons="auto"
                value={
                  filter.values.some((tab) => tab.value === filter.value) &&
                  filter.value
                }
                onChange={(e, v) => onChanges(filter.id, v, true)}
              >
                {filter.values.map((tab) => (
                  <Tab
                    sx={{ marginRight: 0 }}
                    key={tab?.id}
                    value={tab.value}
                    label={translateBackend(tab)}
                  />
                ))}
              </Tabs>
            )}

            {filter.type === FILTER_TYPE.TEXT_FIELD && (
              <TextField
                fullWidth
                size="small"
                label={translate(filter.label)}
                value={filter.value}
                onChange={(e) => onChanges(filter.id, e.target.value, false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onChanges(filter.id, e.target.value, true);
                  }
                }}
              />
            )}

            {filter.type === FILTER_TYPE.DATE_FIELD && (
              <DatePicker
                fullWidth
                size="small"
                slotProps={{ textField: { size: 'small' } }}
                sx={{ width: '100%' }}
                label={translate(filter.label)}
                inputFormat="yyyy-MM-dd"
                format="yyyy-MM-dd"
                value={filter.value ? new Date(filter.value) : null}
                onChange={(value) => {
                  if (value && !isNaN(new Date(value))) {
                    // Only format if the date is valid
                    onChanges(
                      filter.id,
                      format(new Date(value), 'yyyy-MM-dd'),
                      true
                    );
                  } else {
                    onChanges(filter.id, '', true); // Handle clearing the date
                  }
                }}
              />
            )}

            {filter.type === FILTER_TYPE.SELECT_BOX && (
              <TextField
                fullWidth
                size="small"
                select
                label={translate(filter.label)}
                value={filter.value}
                onChange={(e) => onChanges(filter.id, e.target.value, true)}
              >
                {filter.values.map((option) => (
                  <MenuItem
                    key={option?.id}
                    value={option.value}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                    }}
                  >
                    {translateBackend(option)}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {filter.type === FILTER_TYPE.AUTOCOMPLETE && (
              <TableHeaderAutocomplete
                filter={filter}
                onChanges={onChanges}
                appliedFilters={appliedFilters}
              />
            )}
          </Grid>
          {/* Safely render child filters if they exist */}
          {renderChildFilters()}
        </Fragment>
      );
    });

  const initialAppliedFiltersRef = useRef(appliedFilters);
  useEffect(() => {
    const resetValues = ['', 'All', 'all', '*'];

    const applyDefaultToChildren = (filter) => {
      if (!resetValues.includes(filter.value)) {
        onChanges(filter.id, filter.defaultValue || '', true);
      }

      // If this filter has children, apply recursively to each child
      if (filter.child && filter.child.length > 0) {
        filter.child.forEach((childFilter) => {
          applyDefaultToChildren(childFilter);
        });
      }
    };

    // Loop over top-level filters and apply the recursive function
    filters
      .filter(
        (filter) =>
          filter.child &&
          filter.child.length > 0 &&
          (resetValues.includes(filter.value) ||
            filter.resetChild?.(Object.fromEntries(appliedFilters || [])))
      )
      .forEach((filter) => {
        applyDefaultToChildren(filter);
      });

    // Update the ref with the latest applied filters to avoid infinite loop
    initialAppliedFiltersRef.current = appliedFilters;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  useEffect(() => {
    if (!isMount) {
      if (onFilterChanges) onFilterChanges(appliedFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  return (
    <>
      <Stack
        justifyContent="space-between"
        direction="row"
        color="blue"
        alignItems="center"
        gap={2}
      >
        {tabFiltersExist && renderFilters(tabFilters)}
        {!tabFiltersExist && <Box flexGrow={1} />}
        <Stack direction="row">
          <Button
            disableRipple
            color="inherit"
            endIcon={<FilterAltOffIcon />}
            onClick={() => resetFilters()}
          />
          <Button
            disableRipple
            color="inherit"
            endIcon={<FilterAltIcon />}
            onClick={() => setOpenExtendedFilters(!openExtendedFilters)}
          />
        </Stack>
      </Stack>

      <Divider style={{ marginTop: -2, borderWidth: 1 }} />

      {otherFiltersExist && openExtendedFilters && (
        <Stack spacing={3} direction={'row'}>
          <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 12, md: 12 }}
            padding={2}
            paddingTop={0}
            justifyContent="flex-start" // Align items to the start
          >
            {renderFilters(otherFilters)}
          </Grid>
        </Stack>
      )}
    </>
  );
}
