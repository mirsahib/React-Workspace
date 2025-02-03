import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";

const AsyncSelectInput = ({
	name,
	label,
	placeholder,
	loadOptions,
	onChangeInput,
	defaultOptions,
	errors,
	cacheOptions = true,
	containerClass,
	isDisabled = false,
	isSearchable = true,
	isClearable = true,
	closeMenuOnSelect = true,
	blurInputOnSelect = true,
}) => {
	const { control } = useFormContext();
	const customStyles = {
		control: (base, state) => ({
			...base,
			minHeight: "42px",
			backgroundColor: isDisabled ? "#EFEFEF" : "white",
			borderColor: errors[name]
				? "#ef4444"
				: state.isFocused
				? "#182F6C"
				: "#A9A9A9",
			boxShadow: state.isFocused ? "0 0 0 1px #182F6C" : "none",
			"&:hover": {
				borderColor: errors[name] ? "#ef4444" : "#cbd5e1",
			},
			textAlign: "left",
		}),
		menu: (base) => ({
			...base,
			zIndex: 9999,
			textAlign: "left",
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isFocused ? "#e2e8f0" : "white",
			"&:active": {
				backgroundColor: "#e2e8f0",
			},
			color: state.isSelected ? "black" : base.color,
		}),
		valueContainer: (base) => ({
			...base,
			padding: "2px 8px",
		}),
		singleValue: (base, state) => ({
			...base,
			color: "black",
		}),

		// Add loading state styles
		loadingIndicator: (base) => ({
			...base,
			color: "#2563eb",
		}),
		loadingMessage: (base) => ({
			...base,
			color: "#6B7280",
		}),
	};
	return (
		<div className={containerClass}>
			{label && (
				<label
					className="text-sm font-semibold text-gray-600"
					htmlFor={name}
				>
					{label}
				</label>
			)}

			<Controller
				name={name}
				control={control}
				render={({ field: { value, onChange, ref } }) => (
					<AsyncSelect
						styles={customStyles}
						ref={ref}
						defaultOptions={defaultOptions}
						cacheOptions={cacheOptions}
						name={name}
						placeholder={placeholder}
						loadOptions={loadOptions}
						value={value || null}
						onChange={(selected) => {
							onChange(selected);
						}}
						onInputChange={onChangeInput}
						noOptionsMessage={({ inputValue }) =>
							!inputValue ? "Type to search" : "No options found"
						}
						loadingMessage={() => "Loading..."}
						isDisabled={isDisabled}
						isSearchable={isSearchable}
						isClearable={isClearable}
						closeMenuOnSelect={closeMenuOnSelect}
						blurInputOnSelect={blurInputOnSelect}
					/>
				)}
			/>
		</div>
	);
};

export default AsyncSelectInput;
