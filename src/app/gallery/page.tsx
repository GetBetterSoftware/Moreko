"use client";

import Loader from "@/components/HomePage/Loader";
import Login from "@/components/HomePage/Login";
import ShowGallery from "@/components/HomePage/ShowGallery";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";



const Page = () => {
    return <ShowGallery />;
};

export default Page;