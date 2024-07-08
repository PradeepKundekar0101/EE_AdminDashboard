// import './styles.css';  // Import custom styles
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input, Form as AntdForm } from 'antd'
import formImg from '../../assets/images/form-img.png'
import CustomButton from '../../components/ui/button/Button'

interface IFormInput {
  email: string
  firstName: string
  lastName: string
  phone: string
  traders: string[]
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    traders: yup
      .array()
      .of(yup.string().required())
      .min(1, 'At least one trader must be assigned')
  })
  .required()

const FormComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    //@ts-ignore
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
  }

  return (
    <div className='min-h-screen flex items-center justify-evenly py-14 '>
      <div className='max-w-lg p-8 text-black rounded-lg w-[45%]'>
        <div className='max-w-sm'>
          <h2 className=' mb-6 text-4xl text-dark-blue-gray'>Create Mentor</h2>
          <p className='mb-6 text-slate-blue'>Create mentors here</p>
          <AntdForm onFinish={handleSubmit(onSubmit)} layout='vertical'>
            <AntdForm.Item
              label={<span className='text-black'>First Name</span>}
              validateStatus={errors.firstName ? 'error' : ''}
              help={errors.firstName?.message}
            >
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className=' text-black focus:ring-2 focus:ring-blue-500'
                  />
                )}
              />
            </AntdForm.Item>

            <AntdForm.Item
              label={<span className='text-black'>Last Name</span>}
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
              label={<span className='text-black'>Email</span>}
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className=' text-black focus:ring-2 focus:ring-blue-500'
                  />
                )}
              />
            </AntdForm.Item>

            <AntdForm.Item
              label={<span className='text-black'>Phone Number</span>}
              validateStatus={errors.phone ? 'error' : ''}
              help={errors.phone?.message}
            >
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className=' text-black focus:ring-2 focus:ring-blue-500'
                  />
                )}
              />
            </AntdForm.Item>

            <AntdForm.Item>
              <CustomButton
                type='primary'
                htmlType='submit'
                className='w-full text-xl py-5 bg-dark-teal'
              >
                Create
              </CustomButton>
            </AntdForm.Item>
          </AntdForm>
        </div>
      </div>
      <div className='h-[96vh] w-[45%]'>
        <img
          src={formImg}
          alt='form-img'
          className='h-full w-full object-cover rounded-3xl'
        />
      </div>
    </div>
  )
}

export default FormComponent
