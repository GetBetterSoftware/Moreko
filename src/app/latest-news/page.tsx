"use client";

import AllNews from "@/components/HomePage/AllNews";
import Loader from "@/components/HomePage/Loader";
import { signOut, useSession } from "next-auth/react";



const Page = () => {
 
    return <AllNews />;

};

export default Page;