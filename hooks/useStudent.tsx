import { Student } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useContext, createContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type StudentContextType = {
  accessToken: string | null;
  user: User | null;
  student: Student | null;
  isLoading: boolean;
};

export const StudentContext = createContext<StudentContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyStudentContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingStudent, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  const getUser = async () => {
    try {
      const result = await supabase.from('student').select('*').single();
      return result;
    } catch (error) {
      console.error("Failed to fetch student details", error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    if (user && !isLoadingData && !student) {
      setIsLoadingData(true);
      getUser().then((result) => {
        if (result.data) {
          setStudent(result.data as Student);
        }
        setIsLoadingData(false);
      });
    }
  }, [user, isLoadingStudent, isLoadingData, student]);

  useEffect(() => {
    if (!user && !isLoadingStudent && !isLoadingData) {
      setStudent(null);
    }
  }, [user, isLoadingStudent, isLoadingData]);

  const value = {
    accessToken,
    user,
    student,
    isLoading: isLoadingStudent || isLoadingData,
  };

  return <StudentContext.Provider value={value} {...props} />;
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudent must be used within a MyStudentContextProvider");
  }
  return context;
};