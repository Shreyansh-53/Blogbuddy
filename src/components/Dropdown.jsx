import React, { useId } from "react";

function Dropdown({
    options,
    label,
    className='',
    ...props
}, ref){
    const Id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={Id} className="inline-block mb-2 px-2 text-white">
                {label}    
            </label>}
            <select className={`px-3 py-2 rounded-lg duration-150 bg-white text-black focus:bg-gray-100 border border-gray-200 w-full ${className}`} {...props} id={Id} ref={ref}>
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Dropdown);