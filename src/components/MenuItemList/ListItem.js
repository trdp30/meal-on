import { faSpinner, faTrashCan } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { useDeleteMenuItemMutation } from "store/sliceApis/menuItemApi";

function ListItem({ item }) {
  const [deleteItem, result] = useDeleteMenuItemMutation();

  const handleDelete = () => {
    deleteItem(item._id);
  };

  return (
    <div className="flex justify-between bg-white p-4 rounded-md shadow-md">
      <div>
        <div className="text-lg font-semibold">{item.name}</div>
        <div className="text-xs font-medium">({item.mealType})</div>
        <div className="text-gray-500 text-sm font-medium pt-2">
          {item.description}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="text-green-500 font-semibold">Rs. {item.price}</div>
        <button
          className={classNames(
            "font-semibold ml-5 cursor-pointer",
            result.isLoading
              ? "text-red-200"
              : "text-red-500 active:text-red-900",
          )}
          onClick={handleDelete}
          disabled={result.isLoading}
        >
          {result.isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faTrashCan} />
          )}
        </button>
      </div>
    </div>
  );
}

export default ListItem;
