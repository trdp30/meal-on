/* eslint-disable default-case */
import React, { Fragment, useReducer, useState } from "react";
import { produce } from "immer";
import { find, includes, map, trim } from "lodash";
import states from "utils/state.json";
import { useCreateRestaurantMutation } from "store/sliceApis/restaurantApi";
import Button from "components/Button";
import classNames from "classnames";

const constructInitialState = () => {
  return {
    name: "",
    email: "",
    address1: "",
    address2: "",
    state: "",
    district: "",
    city: "",
    pin_code: "",
    location: {},
    phone: "",
  };
};

const fields = [
  {
    title: "Name",
    type: "text",
    name: "name",
    placeholder: "Sharma Hotel",
    isRequired: true,
    autoComplete: "given-name",
  },
  {
    title: "Contact Phone",
    type: "text",
    name: "phone",
    placeholder: "0123456789",
    isRequired: true,
    autoComplete: "phone",
  },
  {
    title: "Contact Email",
    type: "email",
    name: "email",
    placeholder: "your@email.com",
    isRequired: true,
    autoComplete: "email",
  },
  {
    title: "Address 1",
    type: "text",
    name: "address1",
    placeholder: "Enter Address 1",
    isRequired: true,
    autoComplete: "street-address",
  },
  {
    title: "Address 2",
    type: "text",
    name: "address2",
    placeholder: "Enter Address 2",
    isRequired: false,
    autoComplete: "address-level1",
  },
  {
    title: "State",
    type: "select",
    name: "state",
    placeholder: "Select State",
    isRequired: true,
    options: states,
  },
  {
    title: "District",
    type: "select",
    name: "district",
    placeholder: "Select District",
    isRequired: true,
    options: [],
  },
  {
    title: "City/Town/Village",
    type: "text",
    name: "city",
    placeholder: "Raha",
    isRequired: true,
    autoComplete: "address-level2",
  },
  {
    title: "Pin code",
    type: "text",
    name: "pin_code",
    placeholder: "Enter Pin code",
    isRequired: true,
    autoComplete: "postal-code",
  },
  // {
  //   title: "Location",
  //   type: "location",
  //   name: "location",
  //   placeholder: "Select location",
  //   isRequired: true,
  // },
];

const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "name": {
        draft.name = trim(action.value || "");
        break;
      }
      case "email": {
        draft.email = trim(action.value || "");
        break;
      }
      case "phone": {
        draft.phone = trim(action.value || "");
        break;
      }
      case "address1": {
        draft.address1 = trim(action.value || "");
        break;
      }
      case "address2": {
        draft.address2 = trim(action.value || "");
        break;
      }
      case "state": {
        draft.state = trim(action.value || "");
        break;
      }
      case "district": {
        draft.district = trim(action.value || "");
        break;
      }
      case "city": {
        draft.city = trim(action.value || "");
        break;
      }
      case "pin_code": {
        draft.pin_code = trim(action.value || "");
        break;
      }
      case "location": {
        draft.location = action.value;
        break;
      }
      case "reset": {
        const fields = constructInitialState();
        Object.keys(fields).map((key) => {
          draft[key] = fields[key];
        });
        break;
      }
    }
  });
};

export default function CreateRestaurantForm({ back }) {
  const [createRestaurant, result] = useCreateRestaurantMutation();
  const [isReloadForm, toggleReload] = useState(false);

  const [state, dispatch] = useReducer(reducer, constructInitialState());

  const onSave = (e) => {
    e.preventDefault();
    createRestaurant(state);
  };

  const reset = () => {
    dispatch({ type: "reset" });
    toggleReload(true);
    setTimeout(() => {
      toggleReload(false);
    }, 500);
  };

  const handleCancel = () => {
    back();
  };

  if (isReloadForm) {
    return <></>;
  }

  return (
    <form onSubmit={onSave} className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col overflow-y-auto space-y-8 sm:space-y-0 divide-y divide-gray-900/10 pt-4 px-4">
        <div className="w-full max-w-3xl md:divide-y-[1px] mx-auto">
          {fields.map((field) => (
            <Fragment key={field.name}>
              {field.type === "select" && (
                <div className="flex flex-col sm:flex-col md:flex-row">
                  <label
                    htmlFor={field.name}
                    className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    {field.title}
                    {field.isRequired && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <div className="flex flex-1 items-center py-4">
                    <select
                      id={field.name}
                      name={field.name}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      required={field.isRequired}
                      defaultValue={""}
                      disabled={
                        result?.isLoading ||
                        (field.name === "district" ? !state?.state : false)
                      }
                      onChange={(e) =>
                        dispatch({ type: field.name, value: e?.target.value })
                      }
                      className={classNames(
                        "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
                        "ring-1 ring-inset ring-gray-300",
                        "focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm",
                      )}
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.name === "district" ? (
                        <>
                          {map(
                            find(states, ["state", state.state])?.districts,
                            (district) => (
                              <option key={district}>{district}</option>
                            ),
                          )}
                        </>
                      ) : (
                        <>
                          {map(field.options, (state) => (
                            <option key={state.state}>{state.state}</option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              )}
              {field.type === "location" && (
                <div className="flex flex-col sm:flex-col md:flex-row">
                  <label
                    htmlFor={field.name}
                    className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    {field.title}
                    {field.isRequired && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <div className="flex flex-1 items-center py-4">
                    <input
                      type={"text"}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.isRequired}
                      disabled={result?.isLoading}
                      onChange={(e) =>
                        dispatch({ type: field.name, value: e?.target.value })
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
              {includes(["text", "email", "phone"], field.type) && (
                <div className="flex flex-col sm:flex-col md:flex-row">
                  <label
                    className="flex flex-1 items-center text-sm font-medium leading-6 text-gray-900"
                    htmlFor={field.name}
                  >
                    {field.title}
                    {field.isRequired && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <div className="flex flex-1 items-center py-4">
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.isRequired}
                      disabled={result?.isLoading}
                      onChange={(e) =>
                        dispatch({ type: field.name, value: e?.target.value })
                      }
                      className={classNames(
                        "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
                        "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                        "focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6",
                      )}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
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
  );
}
