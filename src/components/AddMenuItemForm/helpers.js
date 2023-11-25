/* eslint-disable default-case */
import { produce } from "immer";
import { trim } from "lodash";

export const constructInitialState = () => {
  return {
    name: "",
    description: "",
    mealType: "Main Course",
    price: "",
  };
};

export const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "name": {
        draft.name = trim(action.value || "");
        break;
      }
      case "description": {
        draft.description = trim(action.value || "");
        break;
      }
      case "mealType": {
        draft.mealType = action.value;
        break;
      }
      case "price": {
        draft.price = action.value;
        break;
      }
      case "reset": {
        const fields = constructInitialState();
        Object.keys(fields).forEach((key) => {
          draft[key] = fields[key];
        });
        break;
      }
    }
  });
};
