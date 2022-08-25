import { Link } from "gatsby";
import React, { FC } from "react";
import { FaGithub } from "react-icons/fa";

const About: FC = () => {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="flex flex-col gap-4">
        {/* header */}
        <div className="flex">
          <img
            className="h-16 w-16 rounded-full object-cover ring ring-purple-300 ring-offset-2 mr-4"
            src="/images/waua.webp"
            alt="avatar"
          />
          <div className="flex flex-col dark:text-white">
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

        {/* music */}
        <div>
          <span className="font-bold text-green-500">
            My Spotify Discover Weekly
          </span>
          <iframe
            // style="border-radius:12px"
            className="rounded-xl"
            src="https://open.spotify.com/embed/playlist/37i9dQZEVXcP7t7XFBksyP?utm_source=generator"
            width="100%"
            height="380"
            frameBorder="0"
            // allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
