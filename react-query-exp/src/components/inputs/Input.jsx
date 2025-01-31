import InputFactory from "./InputFactory";

/**
 * A generic input component that renders an input of the specified type.
 *
 * @param {{ type: string, name: string, label: string, placeholder?: string, register: function, errors?: object }} props
 * @returns {JSX.Element}
 *
 * **/
function Input(props) {
	return (
		<div className="w-full">
			<InputFactory {...props} />
			{props.errors?.[props.name] && (
				<p className="text-sm text-red-500 mt-1">
					{props.errors[props.name]?.message}
				</p>
			)}
		</div>
	);
}
export default Input;
