import Posts from "../components/Posts";
import MiniProfile from "./MiniProfile";
import { signIn, signOut, useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto
    ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      <section className="col-span-2">
        {/*Posts*/}
        <Posts />
      </section>
      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            {/*Mini Profile*/}
            <MiniProfile />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
