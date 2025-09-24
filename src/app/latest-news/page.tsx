"use client";

import AllNews from "@/components/HomePage/AllNews";
import Loader from "@/components/HomePage/Loader";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";



const Page = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session || !session?.user || !session?.user.name) {
    return <AllNews />;
  }

  return <Loader/>;
};

export default Page;