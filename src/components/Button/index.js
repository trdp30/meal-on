import classNames from "classnames";
import { get } from "lodash";
import React from "react";
import PropTypes from "prop-types";

const sizeMap = {
  //   xs: 'md:px-2 md:py-1.5 px-0.5 py-0.5 text-xs font-light',
  sm: "px-4 py-2 text-sm leading-4 rounded-md",
  md: "px-3 py-2.5 text-sm font-medium leading-4 rounded-lg",
  lg: "px-4 py-2.5 text-sm font-medium leading-4 rounded-lg",
  //   xl: 'md:px-6 md:py-2 px-2 py-2 text-lg font-semibold',
};

const iconSizeMap = {
  xs: {
    leading: "-ml-1.5 mr-0.5 h-3 w-3",
    trailing: "ml-0.5 -mr-0.5 h-3 w-3",
    loading: "h-3 w-3",
  },
  sm: {
    leading: "-ml-2 mr-0.5 h-3 w-4",
    trailing: "ml-1 -mr-0.5 h-4 w-4",
    loading: "h-4 w-4",
  },
  md: {
    leading: "-ml-1 mr-1 h-4 w-4 ",
    trailing: "ml-1 -mr-1 h-4 w-4",
    loading: "h-4 w-4",
  },
  lg: {
    leading: "-ml-2 mr-1 md:h-6 md:w-6 h-4 w-4",
    trailing: "ml-2 -mr-1 h-6 w-6",
    loading: "md:h-6 md:w-6 h-3 w-3",
  },
  xl: {
    leading: "-ml-2 mr-1 md:h-8 md:w-8 h-4 w-4",
    trailing: "ml-2 -mr-1.5 h-8 w-8",
    loading: "md:h-6 md:w-6 h-2 w-2",
  },
};

const colorMap = {
  primary: {
    base: classNames(
      "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900",
      "focus:ring-blue-900 focus:ring-2 focus-visible:outline-0",
    ),
    disabled:
      "cursor-not-allowed border border-gray-200 text-gray-400 bg-gray-100",
  },
  tertiary: {
    base: classNames(
      "text-gray-900 border border-gray-300 bg-gray-100",
      "hover:border-gray-400 active:bg-gray-200 active:border-gray-400",
      "focus:ring-gray-400 focus:ring-2 focus-visible:outline-0",
    ),
    disabled:
      "cursor-not-allowed border border-gray-200 text-gray-400 bg-gray-100",
  },
  secondary: {
    base: classNames(
      "text-blue-700 bg-blue-100 border border-transparent",
      "hover:border-blue-300 active:bg-blue-200 focus:ring-blue-200 focus:ring-2",
      "active:border-blue-500 focus-visible:outline-0",
    ),
    disabled:
      "cursor-not-allowed border border-gray-200 text-gray-400 bg-gray-100",
  },
  ghost: {
    base: classNames(
      "text-black-700  border border-gray-200 hover:border-blue-400",
      "hover:text-blue-700 active:border-blue-300 focus:ring-blue-300 focus:ring-2",
      "active:text-blue-700 active:bg-blue-50 focus-visible:outline-0",
    ),
    disabled:
      "cursor-not-allowed border border-gray-200 text-gray-400 bg-gray-100",
  },
};

const Button = (props) => {
  const {
    onClick,
    children,
    className,
    loading,
    size = "md",
    type = "primary",
    disabled,
    isFullWidth,
    trailIcon,
    leadingIcon,
    buttonType = "button",
  } = props;

  return (
    <button
      onClick={!loading ? onClick : null}
      type={buttonType}
      className={classNames(
        className,
        get(colorMap, `${type}.${disabled ? "disabled" : "base"}`),
        get(sizeMap, size),
        isFullWidth && "w-full",
        "flex justify-center relative",
      )}
      disabled={disabled}
    >
      {loading ? (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              data-testid="loadingSvg"
              className={classNames(
                "animate-spin",
                type === "transparent" ? "text-black" : "text-white",
                get(iconSizeMap, `${size}.loading`),
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
             7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>

          <span className="invisible">{children}</span>
        </>
      ) : (
        <>
          {leadingIcon && (
            <span className={children && "mr-2.5"}>{leadingIcon}</span>
          )}
          <span>{children}</span>
          {trailIcon && (
            <span className={children && "ml-2.5"}>{trailIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  type: PropTypes.oneOf(["primary", "secondary", "tertiary", "ghost"]),
  disabled: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  trailIcon: PropTypes.any,
  leadingIcon: PropTypes.any,
};

export default Button;
