import React, { Fragment, useReducer, useState } from "react";
import { find, includes, map, get } from "lodash";
import states from "utils/state.json";
import Button from "components/Button";
import classNames from "classnames";
import { constructInitialState, fields, reducer } from "./helpers";

function RestaurantForm({ existingData, handleSubmit, back, isLoading }) {
  const [isReloadForm, toggleReload] = useState(false);

  const reset = () => {
    dispatch({ type: "reset", existingData });
    toggleReload(true);
    setTimeout(() => {
      toggleReload(false);
    }, 500);
  };

  const [state, dispatch] = useReducer(
    reducer,
    constructInitialState(existingData),
  );

  const onSave = (e) => {
    e.preventDefault();
    handleSubmit(state);
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
                      value={get(state, field.name)}
                      disabled={
                        isLoading ||
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
                      value={get(state, field.name)}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.isRequired}
                      disabled={isLoading}
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
                      value={get(state, field.name)}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.isRequired}
                      disabled={isLoading}
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
        <Button disabled={isLoading} size="lg" onClick={reset} type="tertiary">
          Reset
        </Button>
        <Button
          disabled={isLoading}
          size="lg"
          onClick={handleCancel}
          type="secondary"
        >
          Cancel
        </Button>
        <Button
          buttonType="submit"
          size="lg"
          disabled={isLoading}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default RestaurantForm;
