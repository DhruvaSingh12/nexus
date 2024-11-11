"use client";
import {MyStudentContextProvider} from "@/hooks/useStudent";

interface UserProviderProps {
    children: React.ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    return (
        <MyStudentContextProvider>
            {children}
        </MyStudentContextProvider>
    )
};

export default UserProvider;
