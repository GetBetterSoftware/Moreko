"use client"
import {  Book, DoorOpen, HamburgerIcon, Home, ImageDown, Menu, MenuIcon, Settings, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import styles from "@/components/styles/HomepageStyles.module.css"
import Hamburger from 'hamburger-react';
import { signIn, signOut, useSession } from 'next-auth/react';

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false)
    
    return (
        <header className={`text-gray-100 shadow-lg px-5 bg-red-800 absolute max-w-screen top-0 left-0 right-0 ${styles.navbar}` }>
        
          <div className="flex justify-between items-center min-h-20">
            <div className="flex items-center space-x-3">
              <Image src={"/images/LOGO.svg"} width={50} height={50} alt='LOGO'/>
              <div className={`${styles.title}`}>
                <h1 className="text-xl font-bold">Moreko High School</h1>
                <p className="text-red-200 text-sm">Excellence in Education</p>
              </div>
            </div>

            <div className='flex space-x-10 font-weight-600 staticLinks'>
              <Link href="/">Home</Link>
              <Link href="/#about">About</Link>
              <Link href="/#gallery">Gallery</Link>
            </div>

            <NavButtons/>
            <NavLinks menu={showMenu}  />
            <div className={`${styles.menu}`}>
                <Hamburger size={24}  onToggle={toggled => {
                setShowMenu(!showMenu)
            }} />
            </div>
            
           
            
           
          </div>
        
      </header>

    );
}

const NavButtons = () => {
      const {data: session} = useSession()

  return (

    <>

    {
      session?.user ? (

        <div className={`flex items-center space-x-2 ${styles.buttons}`}>
        <Link href={`/admin/${session?.user.name?.toLowerCase().replace(/\s+/g, '-')}`} className="hover:disabled">
              <Button
                variant="outline"
                
                className="text-red-800 border-none bg-gray-100 cursor-pointer"
              >
                <Settings className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => signOut()}
                className="text-red-800 border-none bg-gray-100 cursor-pointer hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
        </div>
        
      ) :
      (
        <div className={`flex items-center space-x-2 ${styles.buttons}`}>
              
              
              <Button
                variant="outline"
                onClick={() => signIn()}
                className="text-red-800 border-none bg-gray-100 cursor-pointer hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              
    </div>
      )
    }
    
    </>
     
  );
}

const NavLinks = ({menu}: any) => {
    
    React.useEffect(() => {
        const menuList = document.getElementById("menu")
        if(menu == true){
            menuList?.classList.remove("hideMenu")
            menuList?.classList.add("showMenu")
            
        }
        else{
            menuList?.classList.add("hideMenu")
            menuList?.classList.remove("showMenu")
            
            
            
        }
        
    }, [menu])

    return (
        <div className={`flex flex-col items-end space-y-2  fixed top-20 showLinks w-full  py-5 `} id="menu">
         
              <Link href="/"  className={`text-red-800 border-none hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-gray-100 rounded homeLinks`}>
              <Home className="w-4 h-4 mr-2" />
              Home</Link>

              <Link href="/#about"  className={`text-red-800 border-none hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-gray-100 rounded homeLinks`}>
              <Book className="w-4 h-4 mr-2" />
              About</Link>

              <Link href="/#gallery"  className={`text-red-800 border-none hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-gray-100 rounded homeLinks`}>
              <ImageDown className="w-4 h-4 mr-2" />
              Gallery</Link>
            
              <Link href="/login"  className="text-red-800 border-none hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-gray-100 rounded">

                <User className="w-4 h-4 mr-2" />
                Log In
              </Link>
              
      </div>
    )
}


export default NavBar;
