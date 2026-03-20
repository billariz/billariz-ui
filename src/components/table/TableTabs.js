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

import { Stack, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useLocales from 'src/hooks/useLocales';

TableTabs.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};
export default function TableTabs({ items, onChange, defaultValue }) {
  const [currentValue, setCurrentValue] = useState(defaultValue || '');
  const { translate } = useLocales();

  const tabChangedValue = (event, newValue) => {
    setCurrentValue(newValue);
    onChange(newValue);
  };
  return (
    <Tabs
      allowScrollButtonsMobile
      variant="scrollable"
      scrollButtons="auto"
      value={currentValue}
      onChange={tabChangedValue}
      sx={{ px: 2, bgcolor: 'background.neutral' }}

    >
      {items.map((tab) => (
        <Tab
          disableRipple
          key={tab.value}
          value={tab.value}
          label={
            <Stack spacing={1} direction="row" alignItems="center">
              <div>{translate(tab.label)}</div>
            </Stack>
          }
        />
      ))}
    </Tabs>
  );
}
