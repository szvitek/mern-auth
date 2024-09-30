import { PropsWithChildren } from "react";

const H1 = ({ children }: PropsWithChildren) => {
  return <h1 className="text-4xl mb-4 text-center">{children}</h1>;
};
export default H1;
