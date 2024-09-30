import AppAlert from "@/components/custom/AppAlert";
import H1 from "@/components/custom/H1";
import useAuth from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const { email, verified, createdAt } = user!; //user will be cached

  return (
    <div className="flex flex-col my-16 items-center">
      <H1>My Account</H1>
      {!verified && (
        <AppAlert variant="warning">Please verify your email</AppAlert>
      )}
      <div className="mt-4">
        <p className="mb-2">
          Email: <span className="text-gray-300">{email}</span>
        </p>
        <p>
          Created on{" "}
          <span className="text-gray-300">
            {new Date(createdAt).toLocaleDateString("en-US")}
          </span>
        </p>
      </div>
    </div>
  );
};
export default ProfilePage;
