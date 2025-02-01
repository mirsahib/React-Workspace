import React from 'react';


/**
 * A form text input with a label.
 * @param {Object} props
 * @param {string} props.name - The input name.
 * @param {string} props.label - The label text.
 * @param {string} props.placeholder - The placeholder text.
 * @param {(name: string) => import('react-hook-form').UseFormRegisterReturn} props.register - The React Hook Form register method.
 * @param {boolean} props.disabled - Whether the input is disabled.
 * @param {string} props.containerClass - The container class name.
 */

const TextInput = ({
	name,
	label,
	placeholder,
	register,
	disabled,
	containerClass,
}) => {
	return (
		<div className={containerClass}>
			<label
				className="text-sm font-semibold text-gray-600"
				htmlFor={name}
			>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type="text"
				placeholder={placeholder}
				{...(register && register(name))}
				disabled={disabled}
				className="w-full py-2 px-4 rounded border focus:outline-none focus:ring-1 focus:ring-base_color"
			/>
		</div>
	);
};

export default TextInput;
