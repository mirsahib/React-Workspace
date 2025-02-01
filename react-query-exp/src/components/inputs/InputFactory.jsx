import React from "react";
import { TextInput, PasswordInput, FileInput, CheckboxInput } from "./index";


const InputTypes = {
	TEXT: TextInput,
	PASSWORD: PasswordInput,
	FILE: FileInput,
	CHECKBOX: CheckboxInput,
}


/**
 * A factory component that selects and renders a select input component
 * based on the specified type.
 *
 * @param {Object} props - The component props.
 * @param {(() => JSX.Element)} props.type - The type of select input component to render or a custom component.
 * @returns {JSX.Element} The selected select input component.
 */
const InputFactory = ({ type, ...props }) => {
	// Use the component or fallback to SyncSelectInput
	const InputComponent = type || TextInput;
	// @ts-ignore
	return <InputComponent {...props} />;
};

export {InputTypes}
export default InputFactory;

