"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useStudent } from "@/hooks/useStudent";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiOutlineHome } from "react-icons/hi";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  heading?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, heading }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useStudent();
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string>(
    "/images/default-avatar.png"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };

  return (
    <div
      className={twMerge(
        "bg-white px-4 py-2 rounded-lg w-full h-full",
        className
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* Navigation buttons */}
        <div className="rounded-full md:flex gap-x-2 items-center">
        <div className="bg-gradient-to-r from-teal-200 to-blue-200 hover:bg-gray-200 p-[4px] rounded-lg">
        <button
          onClick={() => router.push("/")}
          className="flex justify-center items-center w-10 h-10"
        >
          <HiOutlineHome className="text-4xl font-extrabold text-black" />
        </button>
      </div>
          <button
            onClick={() => router.back()}
            className="rounded-full bg-gray-200 hidden md:flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-black" size={50} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-gray-200 hidden md:flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-black" size={50} />
          </button>
        </div>

        {/* Heading section */}
        {heading && (
          <div className="text-center py-2">
            <h1 className="text-transparent bg-clip-text text-center bg-gradient-to-r from-teal-500 to-blue-600 text-[26px] md:text-5xl font-extrabold md:uppercase tracking-widest">
              {heading}
            </h1>
          </div>
        )}

        <div className="relative">
          {user ? (
            <>
              <div className="md:hidden rounded-lg">
                <Button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-2 py-[6px] rounded-lg bg-gradient-to-r from-teal-200 to-blue-200 hover:bg-gray-200 "
                >
                  <img
                    src={currentAvatarUrl}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                    onError={() =>
                      setCurrentAvatarUrl("/images/default-avatar.png")
                    }
                  />
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => router.push("/account")}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-200 rounded-md w-full text-center"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-200 rounded-md w-full text-center"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <div className="hidden md:flex items-center bg-gradient-to-r from-teal-500 to-blue-500 hover:bg-gray-200 px-2 py-2 rounded-full gap-x-2">
                <Button
                  onClick={handleLogout}
                  className="bg-white text-black hover:bg-gray-100 rounded-full"
                >
                  Logout
                </Button>
                <Button
                  onClick={() => router.push("/account")}
                  className="bg-transparent py-1 rounded-full"
                >
                  <img
                    src={currentAvatarUrl}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full ring-2 md:ring-0 object-cover"
                    onError={() =>
                      setCurrentAvatarUrl("/images/default-avatar.png")
                    }
                  />
                </Button>
              </div>
            </>
          ) : (
            <div className="py-1">
              <Button
                onClick={authModal.onOpen}
                className="bg-white text-black rounded-full px-2 py-2"
              >
                Log In
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow h-full">{children}</div>
    </div>
  );
};

export default Header;
