"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import {
  FaBirthdayCake,
  FaGraduationCap,
  FaIdBadge,
  FaImage,
  FaMailBulk,
  FaMale,
  FaSchool,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import useLoadAvatar from "@/hooks/useLoadAvatar";
import { useStudent } from "@/hooks/useStudent";
import RegistrationForm from "./RegistrationForm";
import type { Student } from "@/types";

// Constants moved outside component to prevent recreation
const CLUBS = [
  "GDSC",
  "GFG",
  "Hackhound",
  "ACM",
  "BitBucks",
  "Kalamgiri",
  "CSI",
  "I.S.T.E",
  "Genesis",
  "Aarzoo",
  "Magan",
] as const;

// Types for form state
interface FormState {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  registrationNo: string;
  email: string;
  year: string;
  degree: string;
  branch: string;
  club: string[];
}

const Profile = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { isLoading, user } = useStudent();

  // Combined form state into a single object
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    registrationNo: "",
    email: "",
    year: "",
    degree: "",
    branch: "",
    club: [],
  });

  const [student, setStudent] = useState<Student | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const avatar = useLoadAvatar(student);

  // Memoized computation of isNewStudent
  const isNewStudent = useMemo(() => {
    if (!student) return true;
    return !student.name || 
           !student.surname || 
           !student.gender || 
           !student.birthday || 
           !student.phone || 
           !student.registration_no || 
           !student.year || 
           !student.degree || 
           !student.branch || 
           !student.avatar || 
           !student.email;
  }, [student]);

  // Handlers
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  }, []);

  const handleClubChange = useCallback((selectedClub: string) => {
    setFormState(prev => ({
      ...prev,
      club: prev.club.includes(selectedClub)
        ? prev.club.filter(c => c !== selectedClub)
        : [...prev.club, selectedClub],
    }));
  }, []);

  const handleSave = useCallback(async () => {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phone,
      registrationNo,
      email,
      year,
      degree,
      branch,
      club,
    } = formState;

    // Validation
    if (!firstName || !lastName || !gender || !dateOfBirth || !phone || 
        !registrationNo || !email || !year || !degree || !branch) {
      toast.error("Please fill in all required details.");
      return;
    }

    try {
      let newAvatar = avatar;

      if (image) {
        const { data, error } = await supabaseClient.storage
          .from("avatar")
          .upload(`public/${student?.id}`, image);
          
        if (error) throw error;
        newAvatar = data?.path;
      }

      const updates = {
        id: student?.id,
        club: club.length ? club : null,
        avatar: newAvatar || null,
      };

      const { error: updateError, data: updatedStudentData } = 
        await supabaseClient.from("student").upsert(updates);

      if (updateError) throw updateError;

      toast.success("Profile updated successfully");
      if (updatedStudentData?.[0]) {
        setStudent(updatedStudentData[0]);
      }
      setIsEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  }, [formState, avatar, image, student?.id, supabaseClient]);

  // Effects
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data: { user }, error: userError } = 
          await supabaseClient.auth.getUser();

        if (userError) throw userError;
        if (!user) return;

        const { data, error } = await supabaseClient
          .from("student")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        if (!data) return;

        setStudent(data);
        setFormState({
          firstName: data.name || "",
          lastName: data.surname || "",
          middleName: data.middlename || "",
          gender: data.gender || "",
          dateOfBirth: data.birthday || "",
          phone: data.phone || "",
          registrationNo: data.registration_no || "",
          email: data.email || "",
          year: data.year || "",
          degree: data.degree || "",
          branch: data.branch || "",
          club: data.club || [],
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchStudent();
  }, [supabaseClient]);

  // Memoized info cards data
  const infoCards = useMemo(() => [
    {
      icon: <FaUser size={28} className="text-sky-600" />,
      content: `${formState.firstName} ${formState.middleName} ${formState.lastName}`,
      span: "full",
    },
    {
      icon: <FaBirthdayCake size={28} className="text-sky-600" />,
      content: formState.dateOfBirth,
    },
    {
      icon: <FaMale size={28} className="text-sky-600" />,
      content: formState.gender,
    },
    {
      icon: <FaMailBulk size={28} className="text-sky-600" />,
      content: formState.email,
    },
    {
      icon: <FaIdBadge size={28} className="text-sky-600" />,
      content: formState.registrationNo,
    },
    {
      icon: <FaGraduationCap size={28} className="text-sky-600" />,
      content: `${formState.year} Year`,
    },
    {
      icon: <FaSchool size={28} className="text-sky-600" />,
      content: formState.degree,
    },
    {
      icon: <FaSchool size={28} className="text-sky-600" />,
      content: formState.branch,
    },
  ], [formState]);

  if (isNewStudent) {
    return (
      <RegistrationForm
        {...formState}
        setFirstName={(firstName) => setFormState(prev => ({ ...prev, firstName }))}
        setLastName={(lastName) => setFormState(prev => ({ ...prev, lastName }))}
        setMiddleName={(middleName) => setFormState(prev => ({ ...prev, middleName }))}
        setGender={(gender) => setFormState(prev => ({ ...prev, gender }))}
        setDateOfBirth={(dateOfBirth) => setFormState(prev => ({ ...prev, dateOfBirth }))}
        setPhone={(phone) => setFormState(prev => ({ ...prev, phone }))}
        setRegistrationNo={(registrationNo) => setFormState(prev => ({ ...prev, registrationNo }))}
        setEmail={(email) => setFormState(prev => ({ ...prev, email }))}
        setYear={(year) => setFormState(prev => ({ ...prev, year }))}
        setDegree={(degree) => setFormState(prev => ({ ...prev, degree }))}
        setBranch={(branch) => setFormState(prev => ({ ...prev, branch }))}
        setImage={setImage}
        handleSave={handleSave}
        setClub={(club) => setFormState(prev => ({ ...prev, club }))}
      />
    );
  }

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-full sm:max-w-3xl mx-auto space-y-6">
      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center bg-sky-100 rounded-md p-2 justify-between space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative h-32 w-32 rounded-full bg-white overflow-hidden shadow-lg">
          {avatar ? (
            <Image
              src={avatar}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
              <span>No Image</span>
            </div>
          )}
        </div>
        
        {isEditing && (
          <div className="flex items-center space-x-4">
            <FaImage className="text-sky-600" size={28} />
            <input
              type="file"
              accept="image/*"
              className="px-4 py-2 bg-gray-100 rounded-md text-sm focus:ring-2 focus:ring-sky-500"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className={`flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm
              ${card.span === "full" ? "sm:col-span-2" : ""}`}
          >
            {card.icon}
            <span className="text-lg text-gray-900">{card.content}</span>
          </div>
        ))}
      </div>

      {/* Clubs Section */}
      <div className="flex flex-col space-y-4">
        <div
          className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm cursor-pointer hover:bg-sky-200 transition"
          onClick={() => setIsEditing(true)}
        >
          <FaUsers className="text-sky-600" size={28} />
          <span className="text-lg text-gray-900">
            {formState.club.length > 0 ? formState.club.join(", ") : "No clubs selected"}
          </span>
        </div>

        {isEditing && (
          <div className="flex flex-wrap gap-2">
            {CLUBS.map((clubName) => (
              <label key={clubName} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formState.club.includes(clubName)}
                  onChange={() => handleClubChange(clubName)}
                  className="h-4 w-4 text-sky-600 rounded focus:ring-sky-500"
                />
                <span>{clubName}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;