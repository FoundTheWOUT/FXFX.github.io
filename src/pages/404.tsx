import Button from "@/components/styled/Button";
import Link from "next/link";
import React from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

const Error = () => (
  <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-lg font-bold dark:text-white">
    <div>
      404&nbsp;&nbsp;
      <span className="font-thin">|</span>&nbsp;&nbsp;❌ Not Found
    </div>
    <div className="flex flex-col items-center">
      <ArrowDownIcon className="w-5 animate-bounce" />
      <Button className="px-2">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  </div>
);

export default Error;
