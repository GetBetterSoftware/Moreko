"use client";
import React, { useState } from "react";

import { GraduationCap, User, Users } from "lucide-react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import NavBar from "./NavBar";
import styles from "@/components/styles/HomepageStyles.module.css";
import { Field, Form, Formik } from "formik";

interface UserAuthProps {
  onLogin: (user: {
    id: string;
    email: string;
    role: "admin" | "student" | "parent";
    name: string;
  }) => void;
  onBack: () => void;
}

const Login = () => {
  const initValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "",
    id: "",
    token: "",
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="min-h-screen bg-red-800 flex justify-center p-4 ">
        <div
          className={`p-8 bg-white flex items-center justify-center h-fit mt-20 rounded-md ${styles.login}`}
        >
          <Card
            className={`rounded-none max-w-sm flex flex-col space-x-7 ${styles.card}`}
          >
            <h1 className="font-bold text-gray-800 mb-4 text-center">
              Welcome to Moreko High School
            </h1>
            <p className="text-gray-600 mt-2 text-center">
              Excellence in Education
            </p>
          </Card>
          <Card className={`p-8 ${styles.form}`}>
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-red-800 rounded-full flex items-center justify-center mb-4">
                <Image
                  src={"/images/LOGO.svg"}
                  width={40}
                  height={40}
                  alt="LOGO"
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Register</h1>
            </div>
            <Formik
              initialValues={initValues}
              onSubmit={(values) => console.log(values)}
            >
              {() => (
                <Form className="space-y-6">
                  <StepOne />

                  <Button
                    type="submit"
                    className="w-full bg-red-800 hover:bg-red-900 text-white"
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-center space-y-2">
              <div className="text-sm text-gray-600">
                Don't have an account? Sign up
              </div>

              <Link href="/" className="text-sm text-gray-600 cursor-pointer">
                ← Go to Home page
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;

const StepOne = () => {
  return (
    <>
    <div className="space-y-2">
        <Label htmlFor="email">Full Name</Label>
        <Field
          type="name"
          id="name"
          name="name"
          required
          className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Field
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Field
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
        />
      </div>
    </>
  );
};
