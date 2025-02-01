import React from "react";
import AsyncSelect from "react-select/async";

const AsyncSelectInput = ({
	name,
	label,
	placeholder,
	loadOptions,
	value,
	onChangeItem,
	onChangeInput,
	containerClass,
	isDisabled = false,
	isSearchable = true,
}) => {
	return (
		<div className={containerClass}>
			{label && (
				<label className="block mb-2 font-medium text-left">
					{label}
				</label>
			)}

			<AsyncSelect
				defaultOptions
				name={name}
				placeholder={placeholder}
				loadOptions={loadOptions}
				value={value || null}
				onChange={(selected) => {
					onChangeItem(selected);
				}}
				onInputChange={onChangeInput}
				noOptionsMessage={({ inputValue }) =>
					!inputValue ? "Type to search" : "No options found"
				}
				loadingMessage={() => "Loading..."}
				isDisabled={isDisabled}
				isSearchable={isSearchable}
			/>
		</div>
	);
};

export default AsyncSelectInput;
