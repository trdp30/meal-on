/* eslint-disable default-case */
import Button from "components/Button";
import { triggerToast } from "components/Notification";
import { produce } from "immer";
import { trim } from "lodash";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useCreateUserMutation } from "store/sliceApis/userApi";
import roles from "utils/roles";

const organizations = [
  {
    _id: "6556cb2c3b94f63615537432",
    name: "Testing",
  },
  {
    _id: "6556cbb93b94f63615537433",
    name: "Production",
  },
];

const initialState = {
  email: "",
  phone: "",
  name: "",
  password: "",
  organization_id: organizations[0]._id,
  role: "OWNER",
};

const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "email": {
        draft.email = trim(action.value || "");
        break;
      }
      case "phone": {
        draft.phone = trim(action.value || "");
        break;
      }
      case "name": {
        draft.name = action.value;
        break;
      }
      case "password": {
        draft.password = trim(action.value);
        break;
      }
      case "organization_id": {
        draft.organization_id = trim(action.value);
        break;
      }
      case "role": {
        draft.role = action.value;
        break;
      }
    }
  });
};

const CreateUserForm = () => {
  const [createUser, result] = useCreateUserMutation();
  const [user, dispatch] = useReducer(reducer, initialState);
  const [isReloadForm, toggleReload] = useState(false);

  const roleOptions = Object.values(roles);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, value });
  };

  const reset = () => {
    dispatch({ type: "reset" });
    toggleReload(true);
    setTimeout(() => {
      toggleReload(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: trim(user.email),
      phone: trim(user.phone),
      name: trim(user.name),
      password: trim(user.password),
      organization_id: trim(user.organization_id),
      role: trim(user.role),
    };
    createUser(payload);
  };

  const disableAction = useMemo(() => {
    return result.isLoading;
  }, [result.isLoading]);

  useEffect(() => {
    if (result.isSuccess) {
      reset();
      triggerToast({
        variant: "success",
        message: {
          title: "User added successfully",
        },
      });
    }
    if (result.isError) {
      triggerToast({
        variant: "danger",
        message: {
          title: "Request failed",
          summary: result?.error?.data?.error,
        },
      });
    }
  }, [result.isSuccess, result.isError, result.error]);

  if (isReloadForm) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white p-6 rounded-md shadow-md w-2/4"
    >
      <h2 className="text-2xl font-semibold mb-4">Create User</h2>

      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-600"
      >
        Email:
        <span className="text-red-700">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        disabled={result.isLoading}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-600"
      >
        Phone:
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        disabled={result.isLoading}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <label htmlFor="name" className="block text-sm font-medium text-gray-600">
        Name:
        <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={user.name}
        onChange={handleChange}
        disabled={result.isLoading}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-600"
      >
        Password:
        <span className="text-red-700">*</span>
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        disabled={result.isLoading}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <label
        htmlFor="profile_pic"
        className="block text-sm font-medium text-gray-600"
      >
        Profile Picture URL:
      </label>
      <input
        type="text"
        id="profile_pic"
        name="profile_pic"
        value={user.profile_pic}
        disabled={result.isLoading}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <label htmlFor="role" className="block text-sm font-medium text-gray-600">
        Role:
        <span className="text-red-700">*</span>
      </label>
      <select
        id="role"
        name="role"
        value={user.role}
        disabled={result.isLoading}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        {roleOptions.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <label htmlFor="role" className="block text-sm font-medium text-gray-600">
        Organization:
        <span className="text-red-700">*</span>
      </label>
      <select
        id="organization_id"
        name="organization_id"
        value={user.organization_id}
        disabled={result.isLoading}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        {organizations.map((organization) => (
          <option key={organization._id} value={organization._id}>
            {organization.name}
          </option>
        ))}
      </select>

      <Button
        buttonType="submit"
        disabled={disableAction}
        loading={result.isLoading}
      >
        Create User
      </Button>
    </form>
  );
};

export default CreateUserForm;
