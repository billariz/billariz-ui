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
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
import useLocales from 'src/hooks/useLocales';

// components
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';

// sections
import { JournalList } from 'src/sections/@dashboard/journal/item/index';

export default function JournalPage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title={translate('Journal.JournalList')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Journal.JournalList"
          icon="journal"
          links={[
            { name: 'Journal.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Journal.Journal', href: PATH_DASHBOARD.journal.root },
            { name: 'Journal.List' },
          ]}
        />

        <JournalList />
      </Container>
    </Page>
  );
}
