import { TextInput, PasswordInput, FileInput, CheckboxInput } from "./index";

/**
 * A factory component that returns an input component based on the specified type.
 *
 * @param {string} type The type of input component to render ('text', 'password', 'file', 'checkbox').
 * @param {object} props Additional props to be passed to the input component.
 * @returns {JSX.Element} The corresponding input component for the given type.
 */

const InputFactory = ({ type, ...props }) => {
	const inputTypes = {
		text: TextInput,
		password: PasswordInput,
		file: FileInput,
		checkbox: CheckboxInput,
	};

	const InputComponent = inputTypes[type] || TextInput;
	return <InputComponent {...props} />;
};

export default InputFactory;

