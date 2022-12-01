import { StaticImage } from "gatsby-plugin-image";
import React, { FC, Suspense } from "react";
import { FaGithub } from "react-icons/fa";

const About: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-4">
        {/* header */}
        <div className="flex">
          <StaticImage
            className="mr-4 h-16 w-16 rounded-full object-cover ring ring-purple-300 ring-offset-2"
            src="https://www.gravatar.com/avatar/f5ac7b0d2a8c9ad1d58cf61edba08473"
            alt="avatar"
          />
          <div className="flex flex-col dark:text-white">
            <div className="mb-auto">
              <div className="mb-1 text-lg font-bold leading-4">Waua</div>
              <div className="text-sm leading-3">Frontend Developer</div>
            </div>
            <div>
              <a href="https://github.com/FoundTheWOUT" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* music */}
        <div>
          <span className="font-bold text-green-500">
            My Spotify Discover Weekly
          </span>
          <Suspense fallback={<div>hi</div>}>
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
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default About;
