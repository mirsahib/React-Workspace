import React from "react";
import {SyncSelectInput, MultiSelectInput,AsyncSelectInput} from "./index";


const SelectType = {
	SYNC_SELECT: SyncSelectInput,
	MULTI_SELECT: MultiSelectInput,
	ASYNC_SELECT: AsyncSelectInput
};

/**
 * A factory component that selects and renders a select input component
 * based on the specified type.
 *
 * @param {Object} props - The component props.
 * @param {(() => JSX.Element)} props.type - The type of select input component to render or a custom component.
 * @returns {JSX.Element} The selected select input component.
 */
const SelectInputFactory = ({ type, ...props }) => {
	const SelectInputComponent = type || SyncSelectInput;
	return <SelectInputComponent {...props} />;
};

export { SelectType };
export default SelectInputFactory;
