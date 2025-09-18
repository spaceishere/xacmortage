declare module "antd" {
  import { ReactNode } from "react";

  export interface FormProps {
    form?: unknown;
    onFinish?: (values: Record<string, unknown>) => void | Promise<void>;
    layout?: "horizontal" | "vertical" | "inline";
    className?: string;
    children?: ReactNode;
  }

  export interface FormItemProps {
    name?: string;
    rules?: Array<Record<string, unknown>>;
    initialValue?: unknown;
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
      onClose?: () => void;
      duration?: number;
    }) => void;
    error: (config: {
      message: string;
      placement?: string;
      description?: ReactNode;
      btn?: ReactNode;
      key?: string;
      onClose?: () => void;
      duration?: number;
    }) => void;
  }

  export const Form: {
    (props: FormProps): JSX.Element;
    Item: (props: FormItemProps) => JSX.Element;
    useForm: () => [unknown];
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
