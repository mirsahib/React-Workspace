import { useState } from "react";

/**
 * A form file input with a label.
 *
 * @param {string} name The input name.
 * @param {string} label The label text.
 * @param {import('react-hook-form').UseFormRegister} [register] The React Hook Form register method.
 * @param {import('react-hook-form').RegisterOptions} [validation] The React Hook Form validation rules.
 * @param {boolean} [disabled] Whether the input is disabled.
 * @param {string} [containerClass] The container class name.
 */
const FileInput = ({
	name,
	label,
	register,
	validation,
	disabled,
	containerClass,
}) => {
	const [fileName, setFileName] = useState("");

	const handleFileChange = (e) => {
		if (e.target.files.length > 0) {
			setFileName(e.target.files[0].name);
		} else {
			setFileName("");
		}
	};

	return (
		<div className={containerClass}>
			<div className="flex flex-col ">
				<label className="text-sm font-semibold text-gray-600">
					{label}
				</label>
				<label
					htmlFor={name}
					className={`text-white text-center cursor-pointer px-4 py-2 bg-gray-500 rounded ${
						disabled ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					Choose File
				</label>
				<input
					id={name}
					name={name}
					type="file"
					{...(register && register(name, validation))}
					disabled={disabled}
					className="hidden"
					onChange={handleFileChange}
				/>
				{fileName && (
					<p className="text-gray-600 text-sm">{fileName}</p>
				)}
			</div>
		</div>
	);
};

export default FileInput;
