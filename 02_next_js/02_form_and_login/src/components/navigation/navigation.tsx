import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";

// this is relevant whenever the whole application is not
// behind a login functionality
export const Navigation = async () => {
  const session = await getServerSession(authConfig);

  console.log(session);

  return session !== null ? (
    <nav className='h-12 w-full bg-purple-600 text-white font-bold'>
      {session === null ? <>unpersönliche avatar</> : <>persönliche avatar</>}
    </nav>
  ) : null;
};
