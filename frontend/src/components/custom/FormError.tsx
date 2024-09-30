import { PropsWithChildren } from "react";

const FormError = ({ children }: PropsWithChildren) => {
  return <div className="text-red-500 text-center">{children}</div>;
};
export default FormError;
