"use client";
import { BookTemplate, Hamburger, History, Home, Library, Link, LogOut, MessageSquare, Phone } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import styles from "@/components/styles/HomepageStyles.module.css"



const DashNav = () => {
    const [showMenu, setShowMenu] = useState(false)
  return (
    // const [showMenu, setShowMenu] = useState(false)

    <header className={`${styles.navbar}`}>
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
        <div className="flex items-center space-x-4 ">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
            <h1 className={`text-lg font-semibold text-gray-900 ${styles.title}`}>Moreko High School</h1>
            <p className={`text-sm text-gray-500 ${styles.title}`}>SMS Admin Portal</p>
            </div>
        </div>
        
        </div>
        <DashButtons/>
        <DashLinks menu={showMenu}/>
        <div className={`${styles.menu}`}>
            <Hamburger size={24}  onToggle={toggled => {
            setShowMenu(!showMenu)
        }} />
        </div>
    </div>
    </header>

  )
}

const  DashButtons = () => {
    return(
        <div className={`flex items-center space-x-2 ${styles.buttons}`}>
            <Link href='/logout' className="hover:disabled">
            
                <Button variant={'outline'}
                    
                    className="flex items-center space-x-2  bg-red-800 hover:bg-red-900 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                </Button>
                <Button variant={'outline'}
                    
                    className="flex items-center space-x-2  bg-red-800 hover:bg-red-900 cursor-pointer">
                    <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                </Button>
                <Button variant='outline'     
                    className="flex items-center space-x-2  bg-red-800 hover:bg-red-900 cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                        <span>Messages</span>
                </Button>
                <Button variant='outline' 
                       
                    className="flex items-center space-x-2  bg-red-800 hover:bg-red-900 cursor-pointer">
                    <Phone className="w-4 h-4" />
                        <span>Contacts</span>
                </Button>
                <Button variant='outline' 
                        
                    className="flex items-center space-x-2  bg-red-800 hover:bg-red-900 cursor-pointer">
                    <History className="w-4 h-4" />
                        <span>History</span>
                </Button>
                <Button variant='outline'    
                        
                    className="flex items-center space-x-2  bg-red-800 hover:bg-red-900 cursor-pointer">
                    <Link className="w-4 h-4" />
                        <span>Templates</span>
                </Button>

            </Link>
        </div>   
    )               

}

const DashLinks = ({menu}: any) => {
    
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
            <Link href="/dashboard"  className={`text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded homeLinks`}>
            <Home className="w-4 h-4 mr-2" />
            Dashboard</Link>

            <Link href="/dashboard/messages"  className={`text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded homeLinks`}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages</Link>

            <Link href="/dashboard/contacts"  className={`text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded homeLinks`}>
            <Phone className="w-4 h-4 mr-2" />
            Contacts</Link>

            <Link href="/dashboard/history"  className={`text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded homeLinks`}>
            <History className="w-4 h-4 mr-2" />
            History</Link>

            <Link href="/dashboard/templates"  className={`text-red-800 border-white hover:bg-gray-100 cursor-pointer flex flex-row items-center p-3 w-50 bg-white rounded homeLinks`}>
            <Link className="w-4 h-4 mr-2" />
            Templates</Link>
        </div>

    )

}


export default DashNav;