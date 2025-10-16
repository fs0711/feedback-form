"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  // Redirect to /feedback

  useEffect(() => {
    window.location.href = "/feedback";
  }, []);

  return <div className="bg-white h-screen"></div>;
}
