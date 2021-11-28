import Image from "next/image";
import Posts from "./Posts";
import { useState, useEffect } from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { useAlert } from "react-alert";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const alert = useAlert();
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between pt-2.5 pb-2.5 max-w-6xl mx-5 lg:mx-auto">
        {/*Section 1 of header*/}

        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-36 cursor-pointer"
        >
          <Image
            src="https://www.linkpicture.com/q/QUERY-1.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://www.linkpicture.com/q/QUERY-MOBILE_1.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/*Section 2 of header*/
        /*} {session ? (
          <>
            <div className="max-w-xs">
              <div className="relative mt-1 p-3 rounded-md">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                  type="text"
                  placeholder="Search"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="m-8"></div>
        )}*/}

        {/*Section 3 of header*/}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />

          {session ? (
            <>
              <PaperAirplaneIcon
                onClick={() => {
                  alert.show("Upcoming Feature, Stay Tuned!");
                }}
                className="navBtn"
              />
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn1"
              />
              <UserGroupIcon
                onClick={() => {
                  alert.show("Upcoming Feature, Stay Tuned!");
                }}
                className="navBtn"
              />

              <img
                onClick={signOut}
                src={session?.user?.image}
                alt="profilepic"
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
