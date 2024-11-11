import React, { useState } from "react";
import Button from "@/components/Button";
import {
  FaBirthdayCake,
  FaSchool,
  FaGraduationCap,
  FaIdBadge,
  FaImage,
  FaPhoneAlt,
  FaChild,
  FaMale,
  FaMailBulk,
  FaUsers,
} from "react-icons/fa";

interface RegistrationFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  middleName: string;
  setMiddleName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  registrationNo: string;
  setRegistrationNo: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  degree: string;
  setDegree: (value: string) => void;
  branch: string;
  setBranch: (value: string) => void;
  club: string[];
  setClub: (value: string[]) => void;
  setImage: (file: File | null) => void;
  handleSave: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  gender,
  setGender,
  dateOfBirth,
  setDateOfBirth,
  phone,
  setPhone,
  registrationNo,
  setRegistrationNo,
  email,
  setEmail,
  year,
  setYear,
  degree,
  setDegree,
  branch,
  setBranch,
  club,
  setClub,
  setImage,
  handleSave,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // Handling club and position input
  const handleClubChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedClubs = [...club];
    updatedClubs[index] = e.target.value;
    setClub(updatedClubs);
  };



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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (selectedClub: string) => {
    if (club.includes(selectedClub)) {
      setClub(club.filter((c) => c !== selectedClub));
    } else {
      setClub([...club, selectedClub]);
    }
  };

  return (
    <div className="space-y-4 bg-white text-black p-6">
      {/* Name Fields */}
      <div className="flex w-full items-center space-x-4 p-4 bg-sky-300 rounded-lg">
        <FaChild className="text-sky-900" size={32} />
        <input
          type="text"
          className="flex-grow p-3 w-[32%] bg-gray-100 border border-transparent rounded-lg"
          aria-label="First Name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="flex-grow p-3 w-[32%] bg-gray-100 border border-transparent rounded-lg"
          aria-label="Middle Name"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          className="flex-grow p-3 w-[32%] bg-gray-100 border border-transparent rounded-lg"
          aria-label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-col-2 2xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
        {/* Gender */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaMale className="text-sky-900" size={32} />
          <select
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaBirthdayCake className="text-sky-900" size={32} />
          <input
            type="date"
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaPhoneAlt className="text-sky-900" size={28} />
          <input
            type="tel"
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Phone Number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaMailBulk className="text-sky-900" size={32} />
          <input
            type="email"
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Registration Number */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaIdBadge className="text-sky-900" size={32} />
          <input
            type="text"
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Registration Number"
            placeholder="Registration Number"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
          />
        </div>

        {/* Year */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaGraduationCap className="text-sky-900" size={32} />
          <select
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        {/* Degree */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaSchool className="text-sky-900" size={32} />
          <select
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          >
            <option value="">Select Degree</option>
            <option value="B.Tech.">B.Tech.</option>
            <option value="M.Tech.">M.Tech.</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
            <option value="B.Pharm.">B.Pharm.</option>
            <option value="D.Pharm.">D.Pharm.</option>
            <option value="B.Sc.">B.Sc.</option>
            <option value="DHM">DHM</option>
            <option value="B.A.">B.A.</option>
            <option value="Ph.D">Ph.D</option>
          </select>
        </div>

        {/* Branch */}
        <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
          <FaSchool className="text-sky-900" size={32} />
          <select
            className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg"
            aria-label="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="CSE Core">CSE Core</option>
            <option value="CSE AIML">CSE AIML</option>
            <option value="CSE DS">CSE DS</option>
            <option value="CSE CS">CSE CS</option>
            <option value="CSE CC">CSE CC</option>
            <option value="CSE CSBS">CSE CSBS</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="AE">AE</option>
            <option value="CSE">CSE</option>
            <option value="DS">DS</option>
            <option value="HCM">HCM</option>
            <option value="HMCS">HMCS</option>
            <option value="CS">CS</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Psychology">Psychology</option>
            <option value="English">English</option>
          </select>
        </div>
        
      </div>
    <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center items-center">
      <div className="relative md:w-1/2 w-full">
          <div
            className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaUsers className="text-sky-900" size={32} />
            <span className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg">
              {club.length > 0 ? club.join(", ") : "Select Club(s)  ↑"}
            </span>
          </div>

          {isOpen && (
            <div className="absolute grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 bottom-full mb-2 bg-gray-100 border rounded-lg shadow-lg z-10 w-full p-3">
              {clubs.map((clubName) => (
                <label
                  key={clubName}
                  className="flex text-lg items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={club.includes(clubName)}
                    onChange={() => handleCheckboxChange(clubName)}
                    className="h-4 w-4 rounded-full"
                  />
                  <span>{clubName}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center md:w-1/2 w-full space-x-4 p-[14px] bg-sky-300 rounded-lg">
        <FaImage className="text-sky-900" size={32} />
        <input
          type="file"
          accept="image/*"
          className="p-[11px] w-full bg-gray-100 border border-transparent rounded-lg"
          aria-label="Upload a Profile Image"
          onChange={handleImageChange}
        />
      </div>
      </div>

      <div className="flex pt-8 flex-col items-center">
        <Button
          onClick={handleSave}
          className="bg-sky-500 w-[300px] text-white py-2 px-4 rounded-lg"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
