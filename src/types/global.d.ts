declare module "antd" {
  import { ReactNode } from "react";

  export interface FormProps {
    form?: any;
    onFinish?: (values: any) => void | Promise<void>;
    layout?: "horizontal" | "vertical" | "inline";
    className?: string;
    children?: ReactNode;
  }

  export interface FormItemProps {
    name?: string;
    rules?: any[];
    initialValue?: any;
    children?: ReactNode;
  }

  export interface InputProps {
    placeholder?: string;
    type?: string;
    id?: string;
    rows?: number;
  }

  export interface SelectProps {
    children?: ReactNode;
  }

  export interface SelectOptionProps {
    value?: string;
    children?: ReactNode;
  }

  export interface ButtonProps {
    type?: string;
    htmlType?: string;
    loading?: boolean;
    children?: ReactNode;
  }

  export interface NotificationApi {
    success: (config: {
      message: string;
      placement?: string;
      description?: ReactNode;
      btn?: ReactNode;
      key?: string;
      onClose?: Function;
      duration?: number;
    }) => void;
    error: (config: {
      message: string;
      placement?: string;
      description?: ReactNode;
      btn?: ReactNode;
      key?: string;
      onClose?: Function;
      duration?: number;
    }) => void;
  }

  export const Form: {
    (props: FormProps): JSX.Element;
    Item: (props: FormItemProps) => JSX.Element;
    useForm: () => [any];
  };

  export const Input: {
    (props: InputProps): JSX.Element;
    TextArea: (props: InputProps) => JSX.Element;
  };

  export const Select: {
    (props: SelectProps): JSX.Element;
    Option: (props: SelectOptionProps) => JSX.Element;
  };

  export const Button: (props: ButtonProps) => JSX.Element;

  export const notification: NotificationApi;
}
