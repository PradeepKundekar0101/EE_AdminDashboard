import './styles.css';  // Import custom styles
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, Select, Form as AntdForm } from 'antd';
import 'tailwindcss/tailwind.css';

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  traders: string[];
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  traders: yup.array().of(yup.string().required()).min(1, 'At least one trader must be assigned')
}).required();

const FormComponent: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-14 bg-[#0A0B0D]">
      <div className="max-w-lg w-full p-8 bg-[#0A0B0D] border  border-white text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create your account</h2>
        <p className="mb-6">Get started with the world's most trusted crypto exchange in under a minute.</p>
        <AntdForm onFinish={handleSubmit(onSubmit)} layout="vertical">
          <AntdForm.Item label={<span className="text-white">Email</span>} validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  className="bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              )}
            />
          </AntdForm.Item>

          <AntdForm.Item label={<span className="text-white">First Name</span>} validateStatus={errors.firstName ? 'error' : ''} help={errors.firstName?.message}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  className="bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              )}
            />
          </AntdForm.Item>

          <AntdForm.Item label={<span className="text-white">Last Name</span>} validateStatus={errors.lastName ? 'error' : ''} help={errors.lastName?.message}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  className="bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              )}
            />
          </AntdForm.Item>

          <AntdForm.Item label={<span className="text-white">Phone</span>} validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  className="bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              )}
            />
          </AntdForm.Item>

          <AntdForm.Item label={<span className="text-white">Assign Traders</span>} validateStatus={errors.traders ? 'error' : ''} help={errors.traders?.message?.toString()}>
            <Controller
              name="traders"
              control={control}
              render={({ field }) => (
                <Select 
                  {...field} 
                  mode="multiple" 
                  className="bg-black text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  options={[{ value: 'trader1', label: 'Trader 1' }, { value: 'trader2', label: 'Trader 2' }]} 
                />
              )}
            />
          </AntdForm.Item>

          <AntdForm.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-500">
              Create Mentor
            </Button>
          </AntdForm.Item>
        </AntdForm>
      </div>
    </div>
  );
};

export default FormComponent;
