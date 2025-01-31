/**
 * A form checkbox input with a label.
 *
 * @param {string} name The input name.
 * @param {string} label The label text.
 * @param {import('react-hook-form').UseFormRegister} [register] The React Hook Form register method.
 * @param {import('react-hook-form').RegisterOptions} [validation] The React Hook Form validation rules.
 * @param {boolean} [disabled] Whether the input is disabled.
 * @param {string} [containerClass] The container class name.
 */
const CheckboxInput = ({
	name,
	label,
	register,
	validation,
	disabled,
	containerClass,
}) => (
	<div className={containerClass}>
		<div className="flex items-center space-x-2">
			<input
				id={name}
				type="checkbox"
				{...(register && register(name, validation))}
				disabled={disabled}
				className="h-5 w-5 rounded border-gray-300 focus:ring-base_color"
			/>
			<label
				htmlFor={name}
				className="text-sm font-semibold text-gray-600"
			>
				{label}
			</label>
		</div>
	</div>
);
export default CheckboxInput;
