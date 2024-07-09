// CreateButton.tsx
import React, { FC } from 'react'
import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'

interface CustomButtonProps extends ButtonProps {
    children: React.ReactNode;
    className?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      {...props}
      className={classNames(
        ' hover:bg-gray-700 rounded-md py-2 px-4',
        className
      )}
    >
      {children}
    </Button>
  )
}

export default CustomButton
