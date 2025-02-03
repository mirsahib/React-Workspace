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
	defaultOptions,
	cacheOptions=true,
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
				defaultOptions={defaultOptions}
				cacheOptions={cacheOptions}
				name={name}
				placeholder={placeholder}
				loadOptions={loadOptions}
				value={null}
				onChange={onChangeItem}
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
