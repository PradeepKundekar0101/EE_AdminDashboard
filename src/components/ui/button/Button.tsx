import React, { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ children, className, isLoading, ...props }) => {
  return (
    <Button
      {...props}
      className={classNames(
        'hover:bg-gray-700 rounded-md py-2 px-4',
        className
      )}
      loading={isLoading}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
