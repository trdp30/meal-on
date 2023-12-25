/* eslint-disable default-case */

import { produce } from "immer";
import states from "utils/state.json";
import { trim } from "lodash";

export const constructInitialState = (existingData = {}) => {
  return {
    name: existingData?.name || "",
    email: existingData?.email || "",
    address1: existingData?.address1 || "",
    address2: existingData?.address2 || "",
    state: existingData?.state || "",
    district: existingData?.district || "",
    city: existingData?.city || "",
    pin_code: existingData?.pin_code || "",
    phone: existingData?.phone || "",
  };
};

export const fields = [
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

export const reducer = (state, action) => {
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
        const fields = constructInitialState(action?.existingData);
        Object.keys(fields).forEach((key) => {
          draft[key] = fields[key];
        });
        break;
      }
    }
  });
};
