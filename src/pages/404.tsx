import Button from "@/components/styled/Button";
import { Link } from "gatsby";
import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Error = () => (
  <div className="h-[70vh] flex flex-col gap-4 justify-center items-center font-bold text-lg dark:text-white">
    <div>
      404&nbsp;&nbsp;
      <span className="font-thin">|</span>&nbsp;&nbsp;❌ Not Found
    </div>
    <div className="flex flex-col items-center">
      <FaArrowDown className="animate-bounce" />
      <Button className="px-2">
        <Link to="/">Go home</Link>
      </Button>
    </div>
  </div>
);

export default Error;
