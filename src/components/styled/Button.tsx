import cn from "classnames";
import React from "react";

const Button = ({
  children,
  className,
  ...rest
}: JSX.IntrinsicElements["button"]) => {
  return (
    <button
      className={cn(
        "rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
