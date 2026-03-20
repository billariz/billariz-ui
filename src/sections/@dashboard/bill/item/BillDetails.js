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

//Consts
import BILL_LINE_CONFIG from 'src/constants/billLines';

import PropTypes from 'prop-types';

// components
import Scrollbar from 'src/components/Scrollbar';
import TableRow from 'src/components/table/row/CustomTableRow';
import TableHeadCustom from 'src/components/table/TableHeadCustom';
import TableNoData from 'src/components/table/TableNoData';

// mui
import {
  Card,
  Table,
  TableBody,
  TableContainer,
  Container,
} from '@mui/material';

// ----------------------------------------------------------------------

const columns = BILL_LINE_CONFIG.COLUMNS;
// ----------------------------------------------------------------------

BillDetails.propTypes = {
  billLines: PropTypes.array,
};

export default function BillDetails({ billLines }) {
  const isNotFound = !billLines.length;
  return (
    <Container style={{ padding: 0, maxWidth: 'none' }} minwidth="100%">
      <Card style={{ padding: 0 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            <Table size="large">
              <TableHeadCustom
                headLabel={columns}
                rowCount={billLines.length}
                numSelected={0}
              />

              <TableBody>
                {billLines?.map((row) => (
                  <TableRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    selected={false}
                    onSelectRow={() => {}}
                    onDoubleClick={() => {}}
                    handleViewRow={() => {}}
                    hideSelectCheckbox={true}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}
