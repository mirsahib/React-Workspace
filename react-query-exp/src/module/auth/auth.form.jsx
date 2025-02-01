import React, { useCallback } from "react";
import * as Yup from "yup";
import Input from "../../components/inputs/Input";
import { useQuery } from "../../lib/react-query";
import SelectInput from "../../components/SelectInput/SelectInput";
import { SelectType } from "../../components/SelectInput/SelectInputFactory";
import { InputTypes } from "../../components/inputs/InputFactory";
import { FormWrapper } from "../../components/form";
import { debounce } from "../../util";

const useDebounce = (callback, delay) => {
	return useCallback(debounce(callback, delay), [callback, delay]);
};

const userProfile = {
	email: "Np8pN@example.com",
	username: "John Doe",
};

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	username: Yup.string().required("Username is required"),
});

const fetchProfile = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(userProfile); // Simulating API response
		}, 1500); // Simulated delay
	});
};

const fetchOptions = async (inputValue) => {
	console.log("🚀 ~ fetchOptions ~ inputValue:", inputValue)
	if (!inputValue) return [];

	// Simulated API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Mock data response
	const mockData = {
		results: [
			{ id: 1, name: "Apple" },
			{ id: 2, name: "Banana" },
			{ id: 3, name: "Cherry" },
			{ id: 4, name: "Date" },
			{ id: 5, name: "Elderberry" },
		],
	};

	// Filter results based on input
	return mockData.results
		.filter((item) =>
			item.name.toLowerCase().includes(inputValue.toLowerCase())
		)
		.map((item) => ({
			label: item.name,
			value: item.id,
		}));
};
const useDebouncedCallback = (callback, delay) => {
	return useCallback(debounce(callback, delay), [callback, delay]);
  };
  

export default function AuthForm() {
	const [inputValue, setInputValue] = React.useState("");

	const { data, isLoading, error } = useQuery({
		queryKey: ["profile"],
		queryFn: fetchProfile,
	});

	const { data: options, refetch } = useQuery({
		queryKey: ["options", inputValue],
		queryFn: () => fetchOptions(inputValue),
	});

	const debouncedLoadOptions = useDebouncedCallback(
		async (newInputValue, callback) => {
			if (!newInputValue) return callback([]);

			setInputValue(newInputValue); // Update state
			const newData = await refetch(); // Fetch new data
			console.log("🚀 ~ newData:", newData)
			callback(newData || []); // Pass new data to AsyncSelect
		},
		500
	);

	// console.log("🚀 ~ AuthForm ~ options:", options);

	const onSubmit = (data) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
	};
	if (isLoading) return <p>Loading profile...</p>;
	if (error) return <p className="text-red-500">Error loading data</p>;

	return (
		<FormWrapper defaultValues={data} schema={loginSchema}>
			{({ register, handleSubmit, formState: { errors } }) => (
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
							name="role"
							placeholder="Select role"
							register={register}
							errors={errors}
							
							// options={[{ value: "admin", label: "Admin" }]}
							onChangeItem={(e) => console.log(e)}
							// onChangeInput={(e) => console.log(e)}
							loadOptions={debouncedLoadOptions}
						/>
						<button type="submit">Submit</button>
					</div>
				</form>
			)}
		</FormWrapper>
	);
}
