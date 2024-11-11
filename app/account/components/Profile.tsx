"use client";

import useLoadAvatar from "@/hooks/useLoadAvatar";
import { Student } from "@/types";
import { useStudent } from "@/hooks/useStudent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RegistrationForm from "./RegistrationForm";
import Image from "next/image";
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

const Profile = () => {
  const supabaseClient = useSupabaseClient();
  const [student, setStudent] = useState<Student | null>(null);
  const avatar = useLoadAvatar(student);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [club, setClub] = useState<string[]>([]);
  const [isNewStudent, setIsNewStudent] = useState(false);

  const router = useRouter();
  const { isLoading, user } = useStudent();
  const [isEditing, setIsEditing] = useState(false);

  const clubs = [
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
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClubChange = (selectedClub: string) => {
    if (club.includes(selectedClub)) {
      setClub(club.filter((c) => c !== selectedClub));
    } else {
      setClub([...club, selectedClub]);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    const fetchStudent = async () => {
      // Get the currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();

      if (userError) {
        toast.error(userError.message);
        return;
      }

      if (user) {
        const { data, error } = await supabaseClient
          .from("student")
          .select("*")
          .eq("user_id", user.id)
          //.single();

        if (error) {
          toast.error(error.message);
        } else if (data) {
          setStudent(data);
          setIsNewStudent(
            !data.name ||
              !data.surname ||
              !data.gender ||
              !data.birthday ||
              !data.phone ||
              !data.registration_no ||
              !data.year ||
              !data.degree ||
              !data.branch ||
              !data.avatar ||
              !data.email
          );
          setFirstName(data.name || "");
          setLastName(data.surname || "");
          setGender(data.gender || "");
          setDateOfBirth(data.birthday || "");
          setMiddleName(data.middlename || "");
          setPhone(data.phone || "");
          setRegistrationNo(data.registration_no || "");
          setEmail(data.email || "");
          setYear(data.year || "");
          setDegree(data.degree || "");
          setBranch(data.branch || "");
          setClub(data.club || []);
        }
      }
    };

    fetchStudent();
  }, [supabaseClient]);

  const handleSave = async () => {
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !image ||
      !phone ||
      !registrationNo ||
      !email ||
      !year ||
      !degree ||
      !branch
    ) {
      toast.error("Please fill in all details.");
      return;
    }

    let newAvatar = avatar;

    if (image) {
      const { data, error } = await supabaseClient.storage
        .from("avatar")
        .upload(`public/${student?.id}`, image);
      if (error) {
        toast.error(error.message);
        return;
      }
      newAvatar = data?.path;
    }

    const updates = {
      id: student?.id,
      club: club || null,
      avatar: newAvatar || null,
    };

    const { error: updateError, data: updatedStudentData } =
      await supabaseClient.from("student").upsert(updates);
    if (updateError) {
      toast.error(updateError.message);
    } else {
      toast.success("Profile updated successfully");
      if (updatedStudentData) {
        setStudent(updatedStudentData[0]);
      }
    }
  };

  return (
    <div className="bg-white text-black p-6 space-y-4">
    {isNewStudent ? (
      <RegistrationForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        middleName={middleName}
        setMiddleName={setMiddleName}
        gender={gender}
        setGender={setGender}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        phone={phone}
        setPhone={setPhone}
        registrationNo={registrationNo}
        setRegistrationNo={setRegistrationNo}
        email={email}
        setEmail={setEmail}
        year={year}
        setYear={setYear}
        degree={degree}
        setDegree={setDegree}
        branch={branch}
        setBranch={setBranch}
        setImage={setImage}
        handleSave={handleSave}
        club={club}
        setClub={setClub}
      />
    ) : (
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-full sm:max-w-3xl mx-auto space-y-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center bg-sky-100 rounded-md p-2 justify-between space-y-4 sm:space-y-0 sm:space-x-6">
          {avatar ? (
            <div className="relative h-32 w-32 rounded-full bg-white overflow-hidden shadow-lg">
              <Image
                src={avatar ||'images/account.png' }
                alt=""
                className="rounded-full"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-inner">
              <span>No Image</span>
            </div>
          )}
          {isEditing && (
            <div className="flex items-center space-x-4">
              <FaImage className="text-sky-600" size={28} />
              <input
                type="file"
                accept="image/*"
                className="px-4 py-2 bg-gray-100 rounded-md text-sm focus:ring-2 focus:ring-sky-500"
                aria-label="Upload Profile Image"
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
  
        {/* Name */}
        <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
          <FaUser className="text-sky-600" size={28} />
          <span className="text-xl font-medium text-gray-900">
            {firstName} {middleName} {lastName}
          </span>
        </div>
  
        {/* Date of Birth and Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaBirthdayCake className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{dateOfBirth}</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaMale className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{gender}</span>
          </div>
        </div>
  
        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaMailBulk className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{email}</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaIdBadge className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{registrationNo}</span>
          </div>
        </div>
  
        {/* Year, Degree, Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaGraduationCap className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{year} Year</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaSchool className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{degree}</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm">
            <FaSchool className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">{branch}</span>
          </div>
        </div>
  
        {/* Clubs */}
        <div className="flex flex-col space-y-4">
          <div
            className="flex items-center space-x-4 p-4 bg-sky-100 rounded-lg shadow-sm cursor-pointer hover:bg-sky-200 transition"
            onClick={() => setIsEditing(true)}
          >
            <FaUsers className="text-sky-600" size={28} />
            <span className="text-lg text-gray-900">
              {club.length > 0 ? club.join(", ") : "No clubs selected"}
            </span>
          </div>
          {isEditing && (
            <div className="flex flex-wrap gap-2">
              {clubs.map((clubName) => (
                <label key={clubName} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={club.includes(clubName)}
                    onChange={() => handleClubChange(clubName)}
                    className="h-4 w-4 text-sky-600 rounded focus:ring-sky-500"
                  />
                  <span>{clubName}</span>
                </label>
              ))}
            </div>
          )}
        </div>
  
        {/* Buttons */}
        <div className="flex justify-center mt-6">
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Profile;
