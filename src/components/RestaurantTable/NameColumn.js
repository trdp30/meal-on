import AddressCard from "components/AddressCard";
import { useNavigate } from "react-router-dom";

const NameColumn = ({ row, getValue }) => {
  const navigate = useNavigate();
  const onNameClick = () => {
    navigate("/admin/restaurant/" + row?.original?._id);
  };
  return (
    <div>
      <p
        className="text-sm text-blue-700 font-semibold cursor-pointer"
        onClick={onNameClick}
      >
        {getValue()}
      </p>
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
};

export default NameColumn;
