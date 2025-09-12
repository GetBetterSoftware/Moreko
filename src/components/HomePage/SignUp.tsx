"use client";
import React, { useState } from "react";

import { GraduationCap, User, Users } from "lucide-react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import NavBar from "./NavBar";
import Image from "next/image";

const SignUp = () => {

    const initValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        role: '',
        id: '',
        token: ''
    }

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mb-4">
          <Image src={"/images/LOGO.svg"} width={40} height={40} alt='LOGO'/>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Moreko High School
          </h1>
          <p className="text-gray-600 mt-2">Sign In</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-800 hover:bg-red-900 text-white"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <div className="text-sm text-gray-600">
            Don't have an account? Sign up
          </div>

          <Link
            href="/"
            className="text-sm text-gray-600 cursor-pointer"
          >
            ← Go to Home page
          </Link>
        </div>
      </Card>
    </div>
    </>
    
  );
};

export default SignUp;
