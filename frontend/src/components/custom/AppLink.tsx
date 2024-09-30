import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type AppLinkProps = {
  className?: string;
  to: string;
  size?: "default" | "sm" | "lg" | "icon";
};

const AppLink = ({
  to,
  className,
  children,
  size = "default",
}: PropsWithChildren<AppLinkProps>) => {
  return (
    <Button
      type="button"
      variant="link"
      size={size}
      className={cn("p-0", className)}
      asChild
    >
      <Link className="text-blue-500" to={to}>
        {children}
      </Link>
    </Button>
  );
};
export default AppLink;
