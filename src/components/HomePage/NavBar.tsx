"use client"
import {  HamburgerIcon, Menu, MenuIcon, Settings, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import styles from "@/components/styles/HomepageStyles.module.css"
import Hamburger from 'hamburger-react';

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false)
    
    return (
        <header className={`text-white shadow-lg px-5 relative bg-red-800`}>
        <div className="mx-auto ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src={"/images/LOGO.svg"} width={50} height={50} alt='LOGO'/>
              <div className={`${styles.title}`}>
                <h1 className="text-xl font-bold">Moreko High School</h1>
                <p className="text-red-200 text-sm">Excellence in Education</p>
              </div>
            </div>

            

            <NavButtons/>
            <NavLinks menu={showMenu}  />
            <div className={`${styles.menu}`}>
                <Hamburger size={24}  onToggle={toggled => {
                setShowMenu(!showMenu)
            }} />
            </div>
            
           
            
           
          </div>
        </div>
      </header>

    );
}

const NavButtons = () => {
  return (
     <div className={`flex items-center space-x-2 ${styles.buttons}`}>
              <Link href="/login" className="hover:disabled">
              <Button
                variant="outline"
                
                className="text-red-800 border-white hover:bg-gray-100 cursor-pointer"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              </Link>
              <Button
                variant="outline"
                
                className="text-red-800 border-white hover:bg-gray-100 cursor-pointer"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
    </div>
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
        <div className={`flex flex-col items-start space-y-2  fixed top-20 showLinks`} id="menu">
              <Link href="/login"  className="text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
              <Link
                href={"/"}
                className="text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Link>
    </div>
    )
}


export default NavBar;
