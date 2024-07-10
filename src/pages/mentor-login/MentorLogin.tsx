// import './styles.css' // Import custom styles
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input, Form as AntdForm } from 'antd'
import CustomButton from '../../components/ui/button/Button'
import FormLayout from '../../components/layout/form-layout/FormLayout'
import FormImg from '../../assets/images/form-img.png'
import { Link } from 'react-router-dom'

interface IFormInput {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
  })
  .required()

const MentorLogin: React.FC = () => {
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

  const form = (
    <div className='max-w-sm'>
      <AntdForm onFinish={handleSubmit(onSubmit)} layout='vertical'>
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
                className=' text-black focus:ring-2 focus:ring-blue-500'
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
                className=' text-black focus:ring-2 h-[48px] bg-input-bg rounded-xl  focus:ring-blue-500'
              />
            )}
          />
        </AntdForm.Item>
        <AntdForm.Item className='mb-4 text-right'>
          <Link to='/' className='text-link'>Forgot Password?</Link>
        </AntdForm.Item>

        <AntdForm.Item>
          <CustomButton
            type='primary'
            htmlType='submit'
            className='w-full text-xl py-5 bg-dark-teal rounded-xl'
          >
            Sign In
          </CustomButton>
        </AntdForm.Item>
        <AntdForm.Item>
          <CustomButton
            type='default'
            htmlType='submit'
            className='w-full text-xl py-5 rounded-xl text-black border border-dark-teal'
            
          >
           <Link to='/admin-login'>Admin Login</Link> 
          </CustomButton>
        </AntdForm.Item>
        <AntdForm.Item className='text-center'>
          <p className='text-slate-blue'>
            Don't you have an account?<Link to='/' className='text-link'> Sign up </Link>
          </p>
        </AntdForm.Item>
      </AntdForm>
    </div>
  )

  return (
    <FormLayout
      image={FormImg}
      title='Welcome Back Mentor '
      description={`Today is a new day. It"s your day. You shape it. Sign in to start managing your projects.`}
      form={form}
      reverse={true}
    />
  )
}

export default MentorLogin
