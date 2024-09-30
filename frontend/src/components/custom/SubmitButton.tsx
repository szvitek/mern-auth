import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";

type SubmitButtonProps = {
  disabled?: boolean;
  isPending?: boolean;
};

const SubmitButton = ({
  disabled,
  isPending,
  children,
}: PropsWithChildren<SubmitButtonProps>) => {
  return (
    <Button type="submit" className="w-full" disabled={disabled || isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
