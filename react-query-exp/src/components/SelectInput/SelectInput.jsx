import React from "react";
import SelectInputFactory from "./SelectInputFactory";

/**
 * A generic select input component that renders a select input of the specified type.
 *
 * @param {{ type: () => JSX.Element, name: string, label?: string, placeholder?: string, register: function,onChangeItem?:function,onChangeInput?:function,defaultOptions?:any	,loadOptions: function,options?: object, errors?: object }} props
 * @returns {JSX.Element}
 *
 * **/
const SelectInput = (props) => {
	console.log("🚀 ~ SelectInput ~ props:", props.errors)
	return (
		<div className="w-full">
			<SelectInputFactory {...props} />
			{props.errors?.[props.name] && (
				<p className="text-sm text-red-500 mt-1">
					{props.errors[props.name]?.message}
				</p>
			)}
		</div>
	);
};

export default SelectInput;
