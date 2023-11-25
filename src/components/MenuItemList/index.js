import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Loader";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllMenuItemQuery } from "store/sliceApis/menuItemApi";
import ListItem from "./ListItem";

function MenuItemList() {
  const { restaurant_id } = useParams();
  const { data, isLoading } = useGetAllMenuItemQuery(restaurant_id);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      <Link to={`/admin/restaurant/${restaurant_id}/add-menu-item`}>
        <div className="h-full flex flex-1 justify-center items-center bg-white p-4 rounded-md shadow-md text-blue-700 cursor-pointer">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Menu Item
        </div>
      </Link>
      {data.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </div>
  );
}

export default MenuItemList;
