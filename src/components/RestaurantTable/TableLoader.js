/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import classNames from "classnames";
import {
  StripLoader,
  ProfileLoader,
  CheckboxLoader,
} from "components/InfiniteLoaders";

const TableLoader = ({ columns }) => {
  const [rows] = useState(Array(25).fill(""));
  return (
    <>
      {rows.map((d, index) => (
        <tr key={index} role="row" className="odd:bg-white even:bg-slate-50">
          {columns.map((column) => (
            <td
              className={classNames(
                column.columnDef.cellClassName,
                column.id === "name" ? "pr-3" : "px-3",
                (column.columnDef.sticky || column.columnDef.isRightSticky) &&
                  "sticky z-[1]",
                "bg-inherit",
              )}
              style={{
                width: column.columnDef.size,
                left: column.columnDef.sticky ? column.columnDef.left : "",
                right: column.columnDef.isRightSticky
                  ? column.columnDef.right
                  : "",
              }}
              key={column.columnDef.id}
            >
              {column.columnDef.id === "selection" ? (
                <div className="px-2">
                  <CheckboxLoader />
                </div>
              ) : (
                <>
                  {column.columnDef.id === "name" ? (
                    <ProfileLoader withProfilePic strip={1} />
                  ) : (
                    <StripLoader strip={1} />
                  )}
                </>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableLoader;
