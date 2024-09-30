import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import queryClient from "@/config/queryClient";
import { TUser } from "@/lib/types";

type UserMenuProps = {
  user: TUser;
};

const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  return (
    <div className="flex items-center h-[70px] p-4 shadow-md">
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link to="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserMenu;
