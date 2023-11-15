import AddressCard from "components/AddressCard";
import { sortBy } from "lodash";

export const columns = [
  {
    id: "name",
    sortOrder: 0.01,
    hidden: false,
    enableHiding: false,
    accessorKey: "name",
    header: "Restaurants",
    size: 240,
    className: "text-left p-2",
    cellClassName: "p-3",
    cell: ({ row, getValue }) => {
      return (
        <div>
          <p className="text-sm text-gray-700 font-semibold">{getValue()}</p>
          <div className="font-normal lg:hidden">
            <div className="sm:hidden">
              <div className="mt-1 truncate text-gray-700 text-xs">
                {row?.original?.status || "-"}
              </div>
            </div>
            <div className="md:hidden">
              <div className="mt-1 truncate text-gray-700">
                <p className="text-xs">{row?.original?.email || "-"}</p>
                <p className="text-xs">{row?.original?.phone || "-"}</p>
              </div>
            </div>
            <div className="lg:hidden">
              <div className="mt-1 truncate text-gray-500">
                <AddressCard row={row} />
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "status",
    enableSorting: false,
    sortOrder: 0.02,
    hidden: false,
    enableHiding: false,
    accessorKey: "status",
    header: "Status",
    className: "hidden text-left pl-4 sm:table-cell",
    cellClassName: "hidden text-left pl-4 sm:table-cell",
    size: 207,
    cell: ({ getValue }) => <div>{getValue() || "-"}</div>,
  },
  {
    id: "contact",
    enableSorting: false,
    sortOrder: 0.03,
    hidden: false,
    enableHiding: false,
    accessorKey: "email",
    header: "Contact",
    className: "hidden text-left pl-4 md:table-cell",
    cellClassName: "hidden text-left pl-4 md:table-cell",
    size: 207,
    cell: ({ row }) => {
      return (
        <div>
          <p className="text-sm">
            <span className="font-semibold">Email</span>:{" "}
            <span>{row?.original?.email || "-"}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Phone</span>:{" "}
            <span>{row?.original?.phone || "-"}</span>
          </p>
        </div>
      );
    },
  },
  {
    id: "address",
    enableSorting: false,
    sortOrder: 0.04,
    hidden: false,
    enableHiding: false,
    accessorKey: "address1",
    header: "Address",
    className: "hidden text-left pl-4 lg:table-cell",
    cellClassName: "hidden text-left pl-4 lg:table-cell",
    size: 300,
    cell: AddressCard,
  },
];

export const getColumns = () => {
  return sortBy(columns, "sortOrder");
};
