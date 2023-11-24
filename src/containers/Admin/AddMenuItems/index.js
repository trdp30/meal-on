/* eslint-disable default-case */
import Button from "components/Button";
import { trim } from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { produce } from "immer";
import { useCreateMenuItemMutation } from "store/sliceApis/menuItemApi";
import classNames from "classnames";

const constructInitialState = () => {
  return {
    name: "",
    description: "",
    mealType: "",
    price: "",
  };
};

const reducer = (state, action) => {
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

const AddMenuItems = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams();
  const [createMenuItem, result] = useCreateMenuItemMutation();
  const [isReloadForm, toggleReload] = useState(false);
  const [state, dispatch] = useReducer(reducer, constructInitialState());

  const onSave = (e) => {
    e.preventDefault();
    createMenuItem({ ...state, restaurant_id });
  };

  const reset = () => {
    dispatch({ type: "reset" });
    toggleReload(true);
    setTimeout(() => {
      toggleReload(false);
    }, 500);
  };

  useEffect(() => {
    if (result.isSuccess) {
      reset();
    }
  }, [result.isSuccess]);

  const handleCancel = () => {
    navigate(-1);
  };

  if (isReloadForm) {
    return <></>;
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <form className="flex flex-1 flex-col overflow-hidden" onSubmit={onSave}>
        <div className="flex flex-1 flex-col overflow-y-auto space-y-8 sm:space-y-0 divide-y divide-gray-900/10 pt-4 px-4">
          <div className="w-full max-w-3xl md:divide-y-[1px] mx-auto">
            <div className="flex flex-col sm:flex-col md:flex-row">
              <label
                htmlFor="name"
                className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
              >
                Name:
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-1 items-center py-4">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Biryani"
                  required
                  disabled={result?.isLoading}
                  value={state.name}
                  onChange={(e) =>
                    dispatch({ type: "name", value: e?.target.value })
                  }
                  className={classNames(
                    "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
                    "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6",
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-col md:flex-row">
              <label
                htmlFor="description"
                className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
              >
                Description:
              </label>
              <div className="flex flex-1 items-center py-4">
                <textarea
                  name="description"
                  id="description"
                  placeholder="It is made with rice, some type of meat and spices."
                  disabled={result?.isLoading}
                  value={state.description}
                  onChange={(e) =>
                    dispatch({ type: "description", value: e?.target.value })
                  }
                  className={classNames(
                    "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
                    "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6",
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-col md:flex-row">
              <label
                htmlFor="price"
                className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
              >
                Price:
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-1 items-center py-4">
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="180"
                  required
                  min={0}
                  disabled={result?.isLoading}
                  value={state.price}
                  onChange={(e) =>
                    dispatch({ type: "price", value: e?.target.value })
                  }
                  className={classNames(
                    "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
                    "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6",
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-col md:flex-row">
              <label
                htmlFor="mealType"
                className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
              >
                Meal Type:
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-1 items-center py-4">
                <select
                  id="mealType"
                  name="mealType"
                  required
                  disabled={result?.isLoading}
                  value={state.mealType}
                  onChange={(e) =>
                    dispatch({ type: "mealType", value: e?.target.value })
                  }
                  className={classNames(
                    "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
                    "ring-1 ring-inset ring-gray-300",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm",
                  )}
                >
                  <option value="Starter">Starter</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 py-4 border-t-[1px] border-gray-200 bg-gray-100">
          <Button
            disabled={result?.isLoading}
            size="lg"
            onClick={reset}
            type="tertiary"
          >
            Reset
          </Button>
          <Button
            disabled={result?.isLoading}
            size="lg"
            onClick={handleCancel}
            type="secondary"
          >
            Cancel
          </Button>
          <Button
            buttonType="submit"
            size="lg"
            disabled={result?.isLoading}
            loading={result?.isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuItems;
