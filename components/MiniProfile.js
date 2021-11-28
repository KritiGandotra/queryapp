import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-3 ml-10">
      <img
        className="rounded-full border p-[2px] w-14 h-14"
        src={session?.user?.image}
        alt=""
      />
      <div className="flex-1 mx-4">
        <h6 className="font-bold text">{session?.user.username}</h6>
        <h3 className="text-sm text-gray-4">Welcome to Query</h3>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
