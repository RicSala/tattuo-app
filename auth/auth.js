import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export const auth = async () => {
  const session = await getServerSession(authOptions);

  return {
    userId: session,
    // ?.user.id
  };
};

export const useAuth = () => {
  const { data: session } = useSession();

  return {
    userId: session,
    // ?.user.id
  };
};
