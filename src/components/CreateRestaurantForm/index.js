/* eslint-disable default-case */
import React, { Fragment, useReducer } from "react";
import { produce } from "immer";
import { find, includes, map, trim } from "lodash";
import states from "../../utils/state.json";

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
    }
  });
};

function postData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if needed
    },
    body: JSON.stringify(data), // Convert the data object to a JSON string
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response as JSON
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export default function CreateRestaurantForm() {
  const [state, dispatch] = useReducer(reducer, constructInitialState());
  const onSave = (e) => {
    e.preventDefault();
    postData(`${process.env.REACT_APP_API_ENDPOINT}/restaurant/create`, state)
      .then((responseData) => {
        console.log("Data sent successfully:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={onSave}>
      <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
        {fields.map((field) => (
          <Fragment key={field.name}>
            {field.type === "select" && (
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  {field.title}
                  {field.isRequired && <span className="text-red-500">*</span>}
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id={field.name}
                    name={field.name}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    required={field.isRequired}
                    disabled={field.name === "district" ? !state?.state : false}
                    onChange={(e) =>
                      dispatch({ type: field.name, value: e?.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected>
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
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  {field.title}
                  {field.isRequired && <span className="text-red-500">*</span>}
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type={"text"}
                    name={field.name}
                    id={field.name}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required={field.isRequired}
                    onChange={(e) =>
                      dispatch({ type: field.name, value: e?.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            {includes(["text", "email", "phone"], field.type) && (
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  {field.title}
                  {field.isRequired && <span className="text-red-500">*</span>}
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required={field.isRequired}
                    onChange={(e) =>
                      dispatch({ type: field.name, value: e?.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
