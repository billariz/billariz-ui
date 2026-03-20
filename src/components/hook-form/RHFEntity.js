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

import PropTypes from 'prop-types';

// MUI Components
import {
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Container,
  Radio,
  Typography,
  Grid,
  Button,
} from '@mui/material';

// React Hook Form
import { Controller, useFormContext, useWatch } from 'react-hook-form';

// Custom Components
import TableHeader from 'src/hooks/TableHeader';
import { TableHeadCustom, TableNoData } from '../table';
import LoadingTable from '../LoadingTable';
import TableRow from '../table/row/CustomTableRow';
import Iconify from '../Iconify';
import BoxInfos from '../BoxInfos';
import AddOrEditRowTablePopup from '../table/popups/AddOrEditRowTablePopup';

//hooks
import { useTheme } from '@mui/material/styles';
import useList from 'src/hooks/useList';
import { useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';

import useToggle from 'src/hooks/useToggle';
import { useDispatch } from 'react-redux';
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';
import { useSnackbar } from 'notistack';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

RHFEntity.propTypes = {
  name: PropTypes.string.isRequired, // Field name
  label: PropTypes.string,
  getApi: PropTypes.func.isRequired, // Function to fetch data
  config: PropTypes.object, //filters
  columns: PropTypes.array.isRequired,
  form: PropTypes.object, // formulaire
  enityModel: PropTypes.func,
  entityKey: PropTypes.string,
  addApi: PropTypes.func,
  formIndex: PropTypes.number,
  subject: PropTypes.string,
};

export default function RHFEntity({
  name,
  label,
  getApi,
  config,
  columns,
  form,
  enityModel,
  entityKey,
  addApi,
  formIndex,
  subject,
}) {
  const ability = abilityManager.getAbility();

  const { control, setValue } = useFormContext();
  const { translate } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState([]);

  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useList({ defaultRowsPerPage: undefined });

  const onFilterChanges = (appliedFilters) => {
    setPage(0);
    setFilters([
      ...appliedFilters,
      ...(orderBy ? [['sort', `${orderBy},${order}`]] : []),
    ]);
  };

  const onSubmit = async (action, args) => {
    try {
      dispatch(startLoading());

      const result = Array.isArray(args)
        ? await Promise.all(args.map((item) => addApi(item)))
        : [await addApi(args)];

      // Check if all API calls were successful
      if (result.every((res) => res)) {
        enqueueSnackbar(translate('Utilities.addSuccess'), {
          variant: 'success',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to submit:', error);
    } finally {
      dispatch(finishLoading());
      onCloseFrom();
    }
  };
  const isNotFound = !isLoading && rows?.length === 0;
  const currentFieldId = useWatch({ control })._embedded[formIndex][
    name.split('.')[1]
  ];
  const currentField = rows.find((row) => row.id === currentFieldId);

  // Fetch data when filters, page, or rowsPerPage change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page,
          size: rowsPerPage,
          ...Object.fromEntries(
            currentFieldId ? [...filters, ['id', currentFieldId]] : filters
          ),
          ...(orderBy ? { sort: `${orderBy},${order}` } : {}),
        };

        const response = await getApi(params);
        setRows(response._embedded[entityKey].map((e) => new enityModel(e)));
        setTotalCount(response?.page ? response.page.totalElements : 2000);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Skip fetch if `currentField` is already in the current rows
    const currentFieldExists = rows.some((row) => row.id === currentFieldId);

    if (!openFrom && (!currentFieldId || !currentFieldExists)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    rowsPerPage,
    filters,
    order,
    orderBy,
    openFrom,
    getApi,
    currentFieldId, // Use `currentFieldId` instead of `currentField`
  ]);

  return (
    <Box
      component="fieldset"
      borderRadius="8px"
      paddingBottom="12px"
      paddingTop="16px"
      border="1px solid"
      borderColor={theme.palette.grey[500_8]}
      color={theme.palette.primary.dark}
      display="flex"
      gap="12px"
      flexDirection="column"
      boxShadow="0px 0px 5px 0px rgb(0 0 0 / 8%)"
    >
      <legend style={{ marginLeft: '30px', fontWeight: 700 }}>{label}</legend>
      {currentField ? (
        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <BoxInfos config={form.FORMS} values={currentField} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'end',
              mt: 4,
            }}
          >
            {' '}
            <Button
              size="small"
              color="primary"
              onClick={() => {
                setValue(name, '');
              }}
              sx={{ width: 0.33 }}
            >
              {translate('Utilities.change') + ' ' + label}
            </Button>
          </Box>
        </Grid>
      ) : (
        <Container style={{ padding: 0, maxWidth: '1200' }}>
          <Card style={{ padding: 0 }}>
            <TableHeader
              config={config}
              onFilterChanges={onFilterChanges}
              initialFilterValues={[]}
            />
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'large' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={columns}
                  onSort={onSort}
                  displayCheckBox={false}
                />
                <TableBody>
                  {isLoading ? (
                    <LoadingTable />
                  ) : (
                    <Controller
                      name={name}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          {rows?.map((row) => (
                            <TableRow
                              key={row.id}
                              row={row}
                              columns={columns}
                              displayCheckBox={false}
                              onDoubleClick={() => {
                                field.onChange(row.id);
                              }}
                              radioButton={
                                <Radio
                                  value={row.id}
                                  checked={field.value?.id === row.id}
                                  onChange={() => field.onChange(row.id)}
                                />
                              }
                            ></TableRow>
                          ))}
                          {error && (
                            <Typography
                              variant="body2"
                              position={'absolute'}
                              bottom={-20}
                              color="error"
                              sx={{
                                mt: 1,
                                ml: 2,
                                mb: 2,
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {error?.message
                                ? `${label} ${translate(error?.message)}`
                                : ''}
                            </Typography>
                          )}
                        </>
                      )}
                    />
                  )}

                  {!isLoading && <TableNoData isNotFound={isNotFound} />}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ position: 'relative' }}>
              <AddOrEditRowTablePopup
                open={openFrom}
                onClose={onCloseFrom}
                form={form.FORMS}
                action={'create'}
                currentObject={{}}
                onSubmit={onSubmit}
              />
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
              <Can I="CREATE" a={subject} ability={ability}>
                <Button
                  size="small"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  sx={{
                    px: 3,
                    py: 3,
                    top: 0,
                    position: { md: 'absolute' },
                    flexShrink: 0,
                  }}
                  onClick={() => {
                    onOpenFrom();
                  }}
                >
                  {translate('common.form.addLabel') + ' ' + label}
                </Button>
              </Can>
            </Box>
          </Card>
        </Container>
      )}
    </Box>
  );
}
