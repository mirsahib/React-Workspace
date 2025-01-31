/**
 * A form password input with a label.
 *
 * @param {string} name The input name.
 * @param {string} label The label text.
 * @param {string} [placeholder] The placeholder text.
 * @param {import('react-hook-form').UseFormRegister} [register] The React Hook Form register method.
 * @param {import('react-hook-form').RegisterOptions} [validation] The React Hook Form validation rules.
 * @param {boolean} [disabled] Whether the input is disabled.
 * @param {string} [containerClass] The container class name.
 */ 
const PasswordInput = ({
	name,
	label,
	placeholder,
	register,
	validation,
	disabled,
	containerClass,
}) => (
	<div className={containerClass}>
		<label className="text-sm font-semibold text-gray-600" htmlFor={name}>
			{label}
		</label>
		<input
			id={name}
			name={name}
			type="password"
			placeholder={placeholder}
			{...(register && register(name, validation))}
			disabled={disabled}
			className="w-full py-2 px-4 rounded border focus:outline-none focus:ring-1 focus:ring-base_color"
		/>
	</div>
);

export default PasswordInput;