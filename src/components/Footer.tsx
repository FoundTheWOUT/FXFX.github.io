import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col h-28 items-center justify-center text-xs text-gray-400">
      <div>
        Powered by{" "}
        <a className="inline" href="https://www.gatsbyjs.com/">
          Gatsby
        </a>{" "}
        & FXFX.THEME
      </div>
    </div>
  );
};

export default Footer;
