import Button from "components/Button";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddGeoLocation = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams();

  const onSuccess = () => {
    navigate(`/admin/restaurant/${restaurant_id}/add-menu-item`);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1">Map will here</div>
      <div className="flex justify-center py-3">
        <Button onClick={onSuccess}>Save</Button>
      </div>
    </div>
  );
};

export default AddGeoLocation;
