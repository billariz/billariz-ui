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

import { Grid, Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFMultiSelect,
  RHFPhoneInput,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import useLocales from 'src/hooks/useLocales';
import RHFAutocompleteLazy from '../hook-form/RHFAutocompleteLazy';

FormTabsBuilder.propTypes = {
  tabs: PropTypes.object.isRequired, // Expect an object where keys are tab labels, and values are arrays of inputs
  errors: PropTypes.object,
  onSubmitAttempt: PropTypes.bool,
  action: PropTypes.string,
};

export default function FormTabsBuilder({
  tabs,
  errors,
  onSubmitAttempt,
  action,
}) {
  const { translate, translateBackend } = useLocales();
  const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
  const currentTabRef = useRef(currentTab); // Keep track of current tab

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const hasErrors = (tabKey) =>
    tabs[tabKey]?.some((input) => errors?.[input.name]);

  //move to the next tab with errors
  useEffect(() => {
    const firstErrorTab = Object.keys(tabs).find((tabKey) => hasErrors(tabKey));
    if (firstErrorTab && firstErrorTab !== currentTab) {
      setCurrentTab(firstErrorTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmitAttempt]);

  // Only reset tab to first one if `tabs` changes
  useEffect(() => {
    if (
      !currentTabRef.current ||
      !Object.keys(tabs).includes(currentTabRef.current)
    ) {
      setCurrentTab(Object.keys(tabs)[0]);
    }
  }, [tabs]);

  return (
    <>
      {/* Tabs Navigation */}
      <Box>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="auto"
        >
          {Object.keys(tabs).map((tabKey) => (
            <Tab
              key={tabKey}
              label={translate(`TableTabs.${tabKey}`)}
              value={tabKey}
              sx={{
                textTransform: 'capitalize',
                bgcolor: hasErrors(tabKey) ? 'error.main' : '',
                color: hasErrors(tabKey) ? '#fff' : '', // Apply error color if there are errors
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {Object.entries(tabs).map(([tabKey, inputs]) => (
          <Box
            key={tabKey}
            role="tabpanel"
            hidden={tabKey !== currentTab}
            sx={{ display: tabKey === currentTab ? 'block' : 'none' }}
          >
            <Grid container spacing={2}>
              {inputs
                .filter((i) => i.type !== 'None')
                .map((input, i) => (
                  <Grid
                    item
                    xs={input.size.xs}
                    sm={input.size.sm}
                    md={input.size.md}
                    lg={input.size.lg}
                    key={`${input.name}-${i}`}
                  >
                    {input.type === 'RHFMultiselect' && (
                      <RHFMultiSelect
                        size="small"
                        name={input.name}
                        values={input.values}
                        label={translate(input.label)}
                        disabled={
                          input.disabled ||
                          (input.disableEdit && action == 'edit') ||
                          input.disabledOnCondition?.(currentFields)
                        }
                      />
                    )}
                    {input.type === 'RHFTextField' && (
                      <RHFTextField
                        size="small"
                        name={input.name}
                        label={translate(input.label)}
                        InputLabelProps={{ shrink: true }}
                        disabled={
                          input.disabled ||
                          (action == 'edit' && input.disableEdit)
                        }
                      />
                    )}
                    {input.type === 'RHFPhoneField' && (
                      <RHFPhoneInput
                        size="small"
                        name={input.name}
                        label={translate(input.label)}
                        InputLabelProps={{ shrink: true }}
                        disabled={
                          input.disabled ||
                          (action == 'edit' && input.disableEdit)
                        }
                      />
                    )}
                    {input.type === 'RHFAutocomplete' && (
                      <RHFAutocomplete
                        size="small"
                        name={input.name}
                        label={translate(input.label)}
                        values={input.values}
                        dependOn={input.dependOn}
                        additionelParams={input.additionelParams}
                        parameterName={input.parameterName}
                        getOptionDisplay={input.getOptionDisplay}
                        linkedField={input.linkedField}
                        dynamicFetching={input.dynamicFetching}
                        disabled={
                          input.disabled ||
                          (input.disableEdit && action == 'edit') ||
                          input.disabledOnCondition?.(currentFields)
                        }
                      />
                    )}
                    {input.type === 'RHFDatePicker' && (
                      <RHFDatePicker
                        disabled={
                          input.disabled ||
                          (action == 'edit' && input.disableEdit)
                        }
                        sx={{ width: 1 }}
                        label={translate(input.label)}
                        name={input.name}
                      />
                    )}
                    {input.type === 'RHFRadioGroup' && (
                      <RHFRadioGroup
                        size="small"
                        name={input.name}
                        options={input.values}
                        getOptionLabel={input.values}
                      />
                    )}
                    {input.type === 'RHFLazyPostalCode' && (
                      <RHFAutocompleteLazy
                        size="small"
                        name={input.name}
                        label={translate(input.label)}
                        options={[]}
                        defaultValue={{
                          postalCode: input.value,
                          city: inputs.find((i) => i.name === 'city').value,
                        }}
                      />
                    )}
                    {input.type === 'RHFSwitch' && (
                      <RHFSwitch
                        size="small"
                        name={input.name}
                        label={translate(input.label)}
                        disabled={
                          input.disabled ||
                          (action == 'edit' && input.disableEdit)
                        }
                      />
                    )}
                    {input.type === 'RHFSelect' && (
                      <RHFSelect
                        size="small"
                        name={input.name}
                        label={translate(input.label)}
                        InputLabelProps={{ shrink: true }}
                        SelectProps={{
                          native: true,
                          sx: { textTransform: 'capitalize' },
                        }}
                        sx={{ width: '100%' }}
                      >
                        <option value=""></option>
                        {input?.values?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {translateBackend(option)}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
}
