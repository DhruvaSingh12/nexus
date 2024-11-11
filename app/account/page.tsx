import React from "react";
import Header from "@/components/Header";
import Box from "@/components/Box";
import Profile from "./components/Profile";

const AccountsPage = () => {
  return (
    <div className="bg-white rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="w-full flex flex-col gap-y-2 h-full">
        <Box>
          <Header heading="Student Registration"/>
        </Box>
        <Box className="overflow-y-auto flex-1 h-full">
          <div className="mt-1 mb-4">
            <Profile />
          </div>
          <div className="mt-4 px-4">
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-6
              gap-3
              mt-4
            ">
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AccountsPage;
