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

import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { ObjectProcessRuleList } from 'src/sections/@dashboard/objectProcessRules/item';
// sections

export default function ObjectProcessRuleListPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title='Rule.List'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='Rule.RuleList'
          icon='rule'
          links={[
            { name: 'Rule.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Rule.Rules', href: PATH_DASHBOARD.objectProcessRule.root },
            { name: 'Rule.List' },
          ]}
        />

        <ObjectProcessRuleList />
      </Container>
    </Page>
  );
}
