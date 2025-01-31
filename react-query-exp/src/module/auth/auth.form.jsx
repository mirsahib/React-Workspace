import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "../../components/inputs/Input";
import { useQuery } from "../../lib/react-query";

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

const FormWrapper = ({ defaultValues, children }) => {
	const methods = useForm({
		resolver: yupResolver(loginSchema),
		mode: "onChange",
		values: defaultValues,
	});

	return <FormProvider {...methods}>{children(methods)}</FormProvider>;
};

export default function AuthForm() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["profile"],
		queryFn: fetchProfile,
	});

	const onSubmit = (data) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
	};
	if (isLoading) return <p>Loading profile...</p>;
	if (error) return <p className="text-red-500">Error loading data</p>;

	return (
		<FormWrapper defaultValues={data}>
			{({ register, handleSubmit, formState: { errors } }) => (
				<form onSubmit={handleSubmit(onSubmit)} action="">
					<div className="flex flex-col gap-4">
						<Input
							type="text"
							label="Email"
							name="email"
							register={register}
							errors={errors}
						/>
						<Input
							type="text"
							label="Username"
							name="username"
							register={register}
							errors={errors}
						/>
						<button type="submit">Submit</button>
					</div>
				</form>
			)}
		</FormWrapper>
	);
}
