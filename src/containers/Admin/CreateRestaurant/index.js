import React from "react";
import CreateRestaurantForm from "components/CreateRestaurantForm";
import { useNavigate } from "react-router-dom";

function CreateRestaurant() {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <CreateRestaurantForm back={back} />
    </div>
  );
}

export default CreateRestaurant;
