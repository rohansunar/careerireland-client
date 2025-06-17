import Link from "next/link";
import React from "react";

const Button = ({ text, link }: { text: string; link: string }) => {
  return (
    <div className="inline-block">
      <Link href={link} className="button font-semibold text-sm lg:text-base">
        {text}
      </Link>
    </div>
  );
};

export default Button;
