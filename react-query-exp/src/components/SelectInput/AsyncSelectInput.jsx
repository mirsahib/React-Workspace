import React from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";

const AsyncSelectInput = ({
	name,
	label,
	placeholder,
	loadOptions,
	value,
	onChangeItem,
	onChangeInput,
	register,
	defaultOptions,
	cacheOptions = true,
	containerClass,
	isDisabled = false,
	isSearchable = true,
}) => {
	// const {control} = useFormContext()
	return (
		<div className={containerClass}>
			{label && (
				<label className="block mb-2 font-medium text-left">
					{label}
				</label>
			)}

			{/* <Controller
				name={name}
				control={control}
				render={({ field:{value,onChange,ref} }) => ( */}
					<AsyncSelect
						// ref={ref}
						defaultOptions={defaultOptions}
						cacheOptions={cacheOptions}
						name={name}
						placeholder={placeholder}
						loadOptions={loadOptions}
						value={value||null}
						// onChange={(selected) => {
						// 	onChange(selected);
						// }}

						onInputChange={onChangeInput}
						noOptionsMessage={({ inputValue }) =>
							!inputValue ? "Type to search" : "No options found"
						}
						loadingMessage={() => "Loading..."}
						isDisabled={isDisabled}
						isSearchable={isSearchable}
						{...register && register(name)}
					// />
				// )}
			/>
		</div>
	);
};

export default AsyncSelectInput;
