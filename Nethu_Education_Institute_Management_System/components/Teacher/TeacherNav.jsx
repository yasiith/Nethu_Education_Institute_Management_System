"use client";
import { useState } from "react";
import Link from "next/link";

const teacherNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-950 text-white py-4 font-semibold">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-4xl pl-10">
          <Link href="/">NEIMS</Link>
        </h1>
      </div>
    </nav>
  );
};

export default teacherNav;
