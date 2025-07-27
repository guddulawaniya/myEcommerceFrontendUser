"use client";
import { useState } from "react";
import Navbar from "./components/nav/page";
import LandingPage from "./landing/page";

export default function Home() {
  return (
      <>
       <Navbar />
       <LandingPage/>
      </>
  );
}