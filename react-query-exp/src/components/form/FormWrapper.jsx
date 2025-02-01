import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';

const FormWrapper = ({defaultValues,schema, children}) => {
      const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        values: defaultValues,
    });
  
    return <FormProvider {...methods}>{children(methods)}</FormProvider>;
  
}

export default FormWrapper