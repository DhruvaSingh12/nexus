import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa"; 
import Image from "next/image"; 
import { twMerge } from "tailwind-merge";

interface ClubItemProps {
  logo: string;      
  clubName: string;   
  clubLink: string;   
  className?: string; 
}

const ClubItem: React.FC<ClubItemProps> = ({ logo, clubName, clubLink, className }) => {
  return (
    <div className={twMerge("flex flex-col p-4 items-center bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300", className)}>
      <div className="md:w-48 md:h-48 w-36 h-36 relative">
        <Image
          src={logo}
          alt={`${clubName} Logo`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <h2 className="md:text-[22px] text-lg font-semibold text-gray-900">
          {clubName}
        </h2>
        <a
          href={clubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 ml-2"
          aria-label={`Visit ${clubName} website`}
        >
          <FaExternalLinkAlt size={20} />
        </a>
      </div>
    </div>
  );
};

export default ClubItem;
