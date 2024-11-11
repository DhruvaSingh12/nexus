import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Student } from "@/types";

const useLoadAvatar = (student: Student | null) => {
  const supabaseClient = useSupabaseClient();

  if (!student || !student.avatar) {
    return null;
  }

  const { data: avatarData } = supabaseClient
    .storage
    .from('avatar')
    .getPublicUrl(student.avatar);

  return avatarData.publicUrl;
};

export default useLoadAvatar;
