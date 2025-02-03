import React from "react";
import * as Yup from "yup";
import Input from "../../components/inputs/Input";
import { useQuery, useQueryClient } from "../../lib/react-query";
import { InputTypes } from "../../components/inputs/InputFactory";
import { FormWrapper } from "../../components/form";
import { debounce } from "../../util";
import { SelectType } from "../../components/SelectInput/SelectInputFactory";
import SelectInput from "../../components/SelectInput/SelectInput";

const userProfile = {
	email: "Np8pN@example.com",
	username: "John Doe",
};

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	username: Yup.string().required("Username is required"),
	fullName: Yup.object().shape({
		value: Yup.string(),
		label: Yup.string(),
	}).nullable().required("Full name is required"),
});

const fetchProfile = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(userProfile); // Simulating API response
		}, 1500); // Simulated delay
	});
};

const fetchOptions = async (inputValue) => {
	const response = await fetch(
		`https://dummyjson.com/users/search?q=${inputValue}`
	);
	if (!response.ok) throw new Error("Network error");
	const data = await response.json();
	const options = data.users.map((user) => ({
		value: user.id,
		label: `${user.firstName} ${user.lastName}`,
	}));
	return options;
};

export default function AuthForm() {
	const [inputValue, setInputValue] = React.useState("");
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ["profile"],
		queryFn: fetchProfile,
	});

	const { data: profileOptions } = useQuery({
		queryKey: ["options", inputValue],
		queryFn: () => fetchOptions(inputValue),
		// enabled:false
	});

	const loadOptions = debounce(async (inputValue, callback) => {
		setInputValue(inputValue);
		const newData = await queryClient.fetchQuery(
			["options", inputValue],
			() => fetchOptions(inputValue)
		);
		callback(newData);
	}, 500);

	// console.log("🚀 ~ AuthForm ~ options:", options);

	const onSubmit = (data) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
	};
	if (isLoading) return <p>Loading profile...</p>;
	if (error) return <p className="text-red-500">Error loading data</p>;

	return (
		<FormWrapper defaultValues={data} schema={loginSchema}>
			{({ register, handleSubmit, formState: { errors }, }) => (
				<form onSubmit={handleSubmit(onSubmit)} action="">
					<div className="flex flex-col gap-4">
						<Input
							type={InputTypes.text}
							label="Email"
							name="email"
							register={register}
							errors={errors}
						/>
						<Input
							type={InputTypes.text}
							label="Username"
							name="username"
							register={register}
							errors={errors}
						/>
						<SelectInput
							type={SelectType.ASYNC_SELECT}
							name="fullName"
							label="Full Name"
							placeholder="Select role"
							register={register}
							errors={errors}
							defaultOptions={profileOptions}
							loadOptions={loadOptions}
						/>
						<button type="submit">Submit</button>
					</div>
				</form>
			)}
		</FormWrapper>
	);
}
