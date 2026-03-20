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
// @mui
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { DefaultCellRenderer } from 'src/components/table/cell/renderer';
// components

// ----------------------------------------------------------------------

CustomTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDoubleClick: PropTypes.func,
  displayCheckBox: PropTypes.bool,
  radioButton: PropTypes.element,
  hideSelectCheckbox: PropTypes.bool,
  handleDuplicateRow: PropTypes.func,
  subject: PropTypes.string,
};

export default function CustomTableRow({
  row,
  columns,
  selected,
  onSelectRow,
  onDoubleClick,
  displayCheckBox = true,
  radioButton,
  hideSelectCheckbox = false,
  handleDuplicateRow,
  subject,
}) {
  return (
    <TableRow
      hover
      selected={selected}
      key={row.id}
      onDoubleClick={onDoubleClick}
    >
      {!hideSelectCheckbox && (
        <TableCell padding="checkbox">
          {displayCheckBox ? (
            <Checkbox checked={selected} onClick={onSelectRow} />
          ) : (
            radioButton
          )}
        </TableCell>
      )}

      {columns.map(({ id, cell }) => {
        const CellRendererComponent = cell.renderer || DefaultCellRenderer;
        const cellConfig = cell.value;
        return (
          <CellRendererComponent
            row={row}
            className={cell.className}
            cellConfig={cellConfig}
            key={`${row.id}-${id}`}
            handleDuplicateRow={handleDuplicateRow}
            subject={subject}
            Component="td"
          />
        );
      })}
    </TableRow>
  );
}
