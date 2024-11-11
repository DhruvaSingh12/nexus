import React, { useCallback, useMemo } from "react";
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

// Constants moved outside component
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

const DEGREES = [
  "B.Tech.",
  "M.Tech.",
  "MCA",
  "MBA",
  "BBA",
  "BCA",
  "B.Pharm.",
  "D.Pharm.",
  "B.Sc.",
  "DHM",
  "B.A.",
  "Ph.D",
] as const;

const BRANCHES = [
  "CSE Core",
  "CSE AIML",
  "CSE DS",
  "CSE CS",
  "CSE CC",
  "CSE CSBS",
  "ECE",
  "ME",
  "AE",
  "CSE",
  "DS",
  "HCM",
  "HMCS",
  "CS",
  "Mathematics",
  "Chemistry",
  "Psychology",
  "English",
] as const;

// Types
interface FormField {
  icon: JSX.Element;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: readonly string[];
  required?: boolean;
  label: string;
}

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

// Reusable form field component
const FormField: React.FC<FormField> = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  options,
  required,
  label,
}) => {
  const baseClasses = "flex-grow p-3 bg-gray-100 border border-transparent rounded-lg";
  
  return (
    <div className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg">
      {icon}
      {type === "select" ? (
        <select
          className={baseClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-label={label}
        >
          <option value="">{`Select ${label}`}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className={baseClasses}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-label={label}
        />
      )}
    </div>
  );
};

const ClubSelector: React.FC<{
  club: string[];
  setClub: (clubs: string[]) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}> = ({ club, setClub, isOpen, toggleDropdown }) => {
  const handleCheckboxChange = useCallback((selectedClub: string) => {
    setClub(
      club.includes(selectedClub)
        ? club.filter((c) => c !== selectedClub)
        : [...club, selectedClub]
    );
  }, [club, setClub]);

  return (
    <div className="relative md:w-1/2 w-full">
      <div
        className="flex items-center space-x-4 p-4 bg-sky-300 rounded-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <FaUsers className="text-sky-900" size={32} />
        <span className="flex-grow p-3 bg-gray-100 border border-transparent rounded-lg">
          {club.length > 0 ? club.join(", ") : "Select Club(s) ↑"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 bottom-full mb-2 bg-gray-100 border rounded-lg shadow-lg z-10 w-full p-3">
          {CLUBS.map((clubName) => (
            <label key={clubName} className="flex text-lg items-center space-x-2">
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
  );
};

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
  const [isOpen, setIsOpen] = React.useState(false);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setImage(e.target.files[0]);
      }
    },
    [setImage]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Memoize form fields configuration
  const formFields = useMemo(
    () => [
      {
        icon: <FaMale className="text-sky-900" size={32} />,
        type: "select",
        value: gender,
        onChange: setGender,
        options: ["Male", "Female"],
        label: "Gender",
        required: true,
      },
      {
        icon: <FaBirthdayCake className="text-sky-900" size={32} />,
        type: "date",
        value: dateOfBirth,
        onChange: setDateOfBirth,
        label: "Date of Birth",
        required: true,
      },
      {
        icon: <FaPhoneAlt className="text-sky-900" size={28} />,
        type: "tel",
        placeholder: "Phone Number",
        value: phone,
        onChange: setPhone,
        label: "Phone",
        required: true,
      },
      {
        icon: <FaMailBulk className="text-sky-900" size={32} />,
        type: "email",
        placeholder: "Email",
        value: email,
        onChange: setEmail,
        label: "Email",
        required: true,
      },
      {
        icon: <FaIdBadge className="text-sky-900" size={32} />,
        type: "text",
        placeholder: "Registration Number",
        value: registrationNo,
        onChange: setRegistrationNo,
        label: "Registration Number",
        required: true,
      },
      {
        icon: <FaGraduationCap className="text-sky-900" size={32} />,
        type: "select",
        value: year,
        onChange: setYear,
        options: ["1", "2", "3", "4"],
        label: "Year",
        required: true,
      },
      {
        icon: <FaSchool className="text-sky-900" size={32} />,
        type: "select",
        value: degree,
        onChange: setDegree,
        options: DEGREES,
        label: "Degree",
        required: true,
      },
      {
        icon: <FaSchool className="text-sky-900" size={32} />,
        type: "select",
        value: branch,
        onChange: setBranch,
        options: BRANCHES,
        label: "Branch",
        required: true,
      },
    ],
    [
      gender,
      setGender,
      dateOfBirth,
      setDateOfBirth,
      phone,
      setPhone,
      email,
      setEmail,
      registrationNo,
      setRegistrationNo,
      year,
      setYear,
      degree,
      setDegree,
      branch,
      setBranch,
    ]
  );

  return (
    <div className="space-y-4 bg-white text-black p-6">
      {/* Name Fields */}
      <div className="flex w-full items-center space-x-4 p-4 bg-sky-300 rounded-lg">
        <FaChild className="text-sky-900" size={32} />
        {["First", "Middle", "Last"].map((type) => (
          <input
            key={type}
            type="text"
            className="flex-grow p-3 w-[32%] bg-gray-100 border border-transparent rounded-lg"
            placeholder={`${type} Name`}
            value={
              type === "First"
                ? firstName
                : type === "Middle"
                ? middleName
                : lastName
            }
            onChange={(e) =>
              type === "First"
                ? setFirstName(e.target.value)
                : type === "Middle"
                ? setMiddleName(e.target.value)
                : setLastName(e.target.value)
            }
            required={type !== "Middle"}
            aria-label={`${type} Name`}
          />
        ))}
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
        {formFields.map((field, index) => (
          <FormField key={index} {...field} />
        ))}
      </div>

      {/* Club and Image Selection */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center items-center">
        <ClubSelector
          club={club}
          setClub={setClub}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
        />

        <div className="flex items-center md:w-1/2 w-full space-x-4 p-[14px] bg-sky-300 rounded-lg">
          <FaImage className="text-sky-900" size={32} />
          <input
            type="file"
            accept="image/*"
            className="p-[11px] w-full bg-gray-100 border border-transparent rounded-lg"
            onChange={handleImageChange}
            aria-label="Upload a Profile Image"
          />
        </div>
      </div>

      {/* Submit Button */}
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