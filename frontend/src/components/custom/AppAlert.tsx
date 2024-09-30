import { PropsWithChildren } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";

type Variants = "success" | "destructive" | "warning";

type AppAlertProps = {
  variant?: Variants;
  description?: string;
};

const renderVariant = (variant: Variants) => {
  if (["destructive", "warning"].includes(variant)) {
    return <AlertCircle className="h-4 w-4" />;
  }

  return <CircleCheck className="h-4 w-4 " />;
};

const AppAlert = ({
  children,
  variant = "success",
  description,
}: PropsWithChildren<AppAlertProps>) => {
  return (
    <Alert
      className="mx-auto w-fit flex flex-col items-center justify-center gap-2"
      variant={variant}
    >
      <div className="flex items-center gap-2">
        {renderVariant(variant)}
        <AlertTitle className="mb-0">{children}</AlertTitle>
      </div>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};
export default AppAlert;
