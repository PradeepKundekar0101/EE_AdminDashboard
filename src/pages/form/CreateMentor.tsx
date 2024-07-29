// CreateMentor.tsx
import './styles.css' // Import custom styles
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input, Form as AntdForm, message } from 'antd'
import CustomButton from '../../components/ui/button/Button'
import FormLayout from '../../components/layout/form-layout/FormLayout'
import FormImg from '../../assets/images/creatementor.jpg'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'

interface IFormInput {
  email: string
  firstName: string
  lastName: string
  phonenumber: string
  password: string
  traders: string[]
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phonenumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    traders: yup
      .array()
      .of(yup.string().required())
      .min(1, 'At least one trader must be assigned')
  })
  .required()

const CreateMentor: React.FC = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    //@ts-ignore
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await api.post('/mentor/create', data)
      message.success("Mentor created successfully!")
      navigate("/admin/")
    } catch (error) {
      message.error("Failed to create mentor. Please try again.")
    }
  }

  const form = (
    <div className='max-w-sm'>
      <AntdForm onFinish={handleSubmit(onSubmit)} layout='vertical'>
        <AntdForm.Item
          label={<span className='text-black text-base'>First Name</span>}
          validateStatus={errors.firstName ? 'error' : ''}
          help={errors.firstName?.message}
        >
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className='text-black focus:ring-2 focus:ring-blue-500'
              />
            )}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label={<span className='text-black text-base'>Last Name</span>}
          validateStatus={errors.lastName ? 'error' : ''}
          help={errors.lastName?.message}
        >
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className='text-black focus:ring-2 focus:ring-blue-500'
              />
            )}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label={<span className='text-black text-base'>Email</span>}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className='text-black focus:ring-2 focus:ring-blue-500'
              />
            )}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label={<span className='text-black text-base'>Phone Number</span>}
          validateStatus={errors.phonenumber ? 'error' : ''}
          help={errors.phonenumber?.message}
        >
          <Controller
            name='phonenumber'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className='text-black focus:ring-2 focus:ring-blue-500'
              />
            )}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label={<span className='text-black text-base'>Password</span>}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className='text-black focus:ring-2 focus:ring-blue-500'
              />
            )}
          />
        </AntdForm.Item>

        <AntdForm.Item>
          <CustomButton
            type='primary'
            htmlType='submit'
            className='w-full text-xl py-5 bg-dark-teal rounded-xl'
          >
            Create
          </CustomButton>
        </AntdForm.Item>

        <AntdForm.Item>
          <CustomButton
            type='primary'
            onClick={() => { navigate("/admin/") }}
            htmlType='button'
            className='w-full text-xl py-5 bg-slate-100 text-dark-teal rounded-xl'
          >
            Cancel
          </CustomButton>
        </AntdForm.Item>
      </AntdForm>
    </div>
  )

  return (
    <FormLayout
      image={FormImg}
      title='Create Mentor'
      description='Create mentors here'
      form={form}
      reverse={false}
    />
  )
}

export default CreateMentor