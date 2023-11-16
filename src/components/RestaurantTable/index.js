/**
 *
 * RestaurantTable
 *
 */

import classNames from "classnames";
import TableLoader from "./TableLoader";
import React, { Fragment, memo, useCallback, useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { EmptyState } from "./EmptyState";
import { getLeft } from "./helpers";
import { getColumns } from "./columns";

export function RestaurantTable(props) {
  const { data = [], isLoading = false, customRowId } = props;
  const sortedColumns = useMemo(() => getColumns(), []);
  const [columnFilters, onColumnFiltersChange] = useState([]);
  const getRowId = useCallback(
    (row, relativeIndex, parent) => {
      if (customRowId) {
        return row[customRowId];
      }
      return parent ? [parent.id, relativeIndex].join(".") : relativeIndex;
    },
    [customRowId],
  );

  const table = useReactTable({
    data,
    columns: sortedColumns,
    state: {
      columnFilters,
    },
    getRowId,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange,
    enableFilters: true,
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiSort: false,
  });

  const { getVisibleLeafColumns } = table;

  return (
    <table
      className={classNames(
        "table-fixed w-full",
        data?.length < 1 && !isLoading ? "h-full" : "",
      )}
    >
      <thead className="sticky top-0 z-[2]">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} id={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                id={header.id}
                colSpan={header.colSpan}
                width={header.getSize()}
                className={classNames(
                  "bg-gray-100 text-sm font-medium text-gray-900",
                  header.column.columnDef.className,
                  header.column.columnDef.sticky ||
                    header.column.columnDef.isRightSticky
                    ? "sticky"
                    : "",
                )}
                style={{
                  left: getLeft(header.column),
                  right: header.column.columnDef.isRightSticky
                    ? header.column.columnDef.right
                    : "",
                }}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {header.column.getCanSort() ? (
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    ) : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </>
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data?.length < 1 && !isLoading ? (
          <tr>
            <EmptyState />
          </tr>
        ) : null}
        {isLoading ? <TableLoader columns={getVisibleLeafColumns()} /> : null}
        {!isLoading && data?.length ? (
          <>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                id={row.id}
                className={classNames(
                  "odd:bg-white even:bg-slate-50 cursor-pointer",
                  row.getIsSelected() && "!bg-blue-50",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <Fragment key={cell.id}>
                    {cell.column.columnDef.id === "threshold" ? (
                      <>
                        {" "}
                        {flexRender(cell.column.columnDef.cell, {
                          ...cell.getContext(),
                          index,
                        })}
                      </>
                    ) : (
                      <td
                        key={cell.id}
                        id={cell.id}
                        width={cell.column.getSize()}
                        className={classNames(
                          cell.column.columnDef.cellClassName,
                          cell.column.columnDef.sticky ||
                            cell.column.columnDef.isRightSticky
                            ? "sticky"
                            : "",
                          "bg-inherit",
                        )}
                        style={{
                          left: getLeft(cell.column),
                          right: cell.column.columnDef.isRightSticky
                            ? cell.column.columnDef.right
                            : "",
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, {
                          ...cell.getContext(),
                          index,
                        })}
                      </td>
                    )}
                  </Fragment>
                ))}
              </tr>
            ))}
          </>
        ) : null}
      </tbody>
    </table>
  );
}

RestaurantTable.propTypes = {};

export default memo(RestaurantTable);
