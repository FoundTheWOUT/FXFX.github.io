import { Link } from "gatsby";
import React, { FC } from "react";
import { FaGithub } from "react-icons/fa";

const About: FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex">
        <img
          className="h-16 w-16 rounded-full object-cover ring ring-purple-300 ring-offset-2 mr-4"
          src="/images/waua.jpg"
          alt="avatar"
        />
        <div className="flex flex-col">
          <div className="mb-auto">
            <div className="font-bold text-lg leading-4 mb-1">Waua</div>
            <div className="text-sm leading-3">Frontend Developer</div>
          </div>
          <div>
            <Link to="https://github.com/FoundTheWOUT" target="_blank">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
