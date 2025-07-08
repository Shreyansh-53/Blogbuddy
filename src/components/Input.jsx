import React, { useId, forwardRef } from "react";

const Input = forwardRef(
  (({ label, type, className = "", placeholder, ...props }, ref) => {
    const Id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-2 px-2 text-white" htmlFor={Id}>
            {label}
          </label>
        )}
        <input
          type={type}
          id={Id}
          ref={ref}
          placeholder={placeholder}
          className={`${className} px-3 py-2 rounded-lg duration-150 bg-white text-black focus:bg-gray-100 border border-gray-200 w-full`}
          {...props}
        />
      </div>
    );
  })
);

export default Input;