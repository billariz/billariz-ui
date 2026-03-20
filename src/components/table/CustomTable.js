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

import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// mui
import {
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Container,
} from '@mui/material';
// components
import TableHeadCustom from './TableHeadCustom';
import TableNoData from './TableNoData';
import LoadingTable from '../LoadingTable';
import TableRow from './row/CustomTableRow';
import Scrollbar from '../Scrollbar';
import TableSelectedActions from './TableSelectedActions';

//hooks
import TableHeader from 'src/hooks/TableHeader';
import useList from 'src/hooks/useList';
import { useDispatch } from 'react-redux';
import useLocales from 'src/hooks/useLocales';
import { useNavigate } from 'react-router-dom';

//Utils
import {
  deserializeFilters,
  serializeFilters,
} from 'src/utils/urlFilterSerializer';
import FallBacks from '../fallbacks';

CustomTable.propTypes = {
  config: PropTypes.object,
  rows: PropTypes.array,
  totalCount: PropTypes.number,
  columns: PropTypes.array,
  isLoading: PropTypes.bool,
  dispatchCallback: PropTypes.func,
  handleOnDoubleClick: PropTypes.func,
  handleDuplicateRow: PropTypes.func,
  renderRowActions: PropTypes.func,
  renderBottomActions: PropTypes.func,
  initialFilterValues: PropTypes.array,
  handleAction: PropTypes.func,
  isRadioSelectable: PropTypes.bool,
  enablePagination: PropTypes.bool,
  subject: PropTypes.string,
  error: PropTypes.number,
};

export default function CustomTable({
  config,
  rows,
  totalCount,
  columns,
  isLoading,
  dispatchCallback,
  handleOnDoubleClick,
  handleDuplicateRow,
  renderRowActions,
  renderBottomActions,
  initialFilterValues,
  handleAction,
  isRadioSelectable = false,
  enablePagination = true,
  subject,
  error,
}) {
  const { translate } = useLocales();
  const queryParamFilters = useMemo(
    () => deserializeFilters(subject),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState([...queryParamFilters]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useList({
    defaultRowsPerPage: enablePagination ? undefined : totalCount,
  });

  useEffect(() => {
    onSelectAllRows();
    dispatch(
      dispatchCallback(page, rowsPerPage, [
        ...(order ? filters : [...filters, ['sort', `id,DESC`]]),
        ...(initialFilterValues || []),
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, filters]);

  useEffect(() => {
    onSelectAllRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  // Avoid infinite loops by checking if initialFilterValues have changed

  const onFilterChanges = (appliedFilters) => {
    setPage(0);
    if (JSON.stringify(filters) === JSON.stringify(appliedFilters)) return;
    setFilters([
      ...appliedFilters,
      ...(orderBy ? [['sort', `${orderBy},${order}`]] : []),
    ]);

    // Serialize filters and update URL
    const queryString = serializeFilters(appliedFilters, subject);
    navigate(`?${queryString}`, { replace: true });
  };

  useEffect(() => {
    if (orderBy) {
      setFilters((prevFilters) => {
        // Remove any existing 'sort' filter
        const updatedFilters = prevFilters.filter(([key]) => key !== 'sort');
        // Add the new 'sort' filter
        return order
          ? [...updatedFilters, ['sort', `${orderBy},${order}`]]
          : updatedFilters;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy]);

  const isNotFound = !rows.length;

  return (
    <Container style={{ padding: 0, maxWidth: 'none' }} minwidth="100%">
      {error >= 400 && error < 600 ? (
        <FallBacks errorCode={error} />
      ) : (
        <Card style={{ padding: 0 }}>
          <TableHeader
            config={config}
            onFilterChanges={onFilterChanges}
            subject={subject}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={rows.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      rows.map((row) => row.id)
                    )
                  }
                  actions={renderRowActions(selected, handleAction)}
                />
              )}
              <Table size={dense ? 'large' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={columns}
                  rowCount={rows.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows?.(
                      checked,
                      rows.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {isLoading ? (
                    <LoadingTable />
                  ) : (
                    rows.map((row) => (
                      <TableRow
                        key={row.id}
                        row={row}
                        columns={columns}
                        subject={subject}
                        selected={selected.includes(row.id)}
                        handleDuplicateRow={handleDuplicateRow}
                        onSelectRow={() =>
                          isRadioSelectable
                            ? handleOnDoubleClick?.(row.id, row)
                            : onSelectRow?.(row.id)
                        }
                        onDoubleClick={() => handleOnDoubleClick?.(row.id, row)}
                        handleViewRow={() => handleViewRow?.(row.id)}
                      />
                    ))
                  )}

                  {!isLoading && <TableNoData isNotFound={isNotFound} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={enablePagination ? [5, 10, 25] : [totalCount]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              labelRowsPerPage={translate('common.rowPerPage')}
            />

            {renderBottomActions?.()}
          </Box>
        </Card>
      )}
    </Container>
  );
}
