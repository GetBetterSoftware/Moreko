import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Sub } from "@radix-ui/themes/components/context-menu"
import { title } from "process"
import NavBar from "./NavBar"
import styles from "@/components/styles/HomepageStyles.module.css"
import DashNav from "../DashboardPage/DashNav"
import DashboardNav from "../Dashboard/DashboardNav"



const StudentPortal = () => {
    const BookData = [
        {
            title: "Master English",
            subject: "English",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Master English",
            subject: "English",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Master English",
            subject: "English",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Master English",
            subject: "English",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Master English",
            subject: "English",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Master Mathematics",
            subject: "Mathematics",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Physics",
            subject: "Physics",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Chemistry",
            subject: "Chemistry",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Biology",
            subject: "Biology",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Computer Science",
            subject: "Computer Science",
            grade: 11,
            date : "25/06/24"
        },
        {
            title: "Natural Science",
            subject: "Natural Science",
            grade: 11,
            date : "25/06/24"
        }
        ]

    return (
        
        <div className={`mx-auto px-4 sm:px-6 lg:px-8  ${styles.styles}`}>
            <DashboardNav/>
            <h1 className={`text-6xl font-bold text-gray-800 mt-25 py-12 mb-4 text-center`}>Welcome back, Student... </h1>
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 border-l-4 border-red-800">
                
                <Table>
                    
                        <TableHeader>
                            <TableRow>
                            <TableHead className="font-medium">Date</TableHead>
                            <TableHead>Book</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead >Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                        BookData.map((book,index) => (
                            <TableRow key={book.title + index}>
                                <TableCell className="font-medium">{book.date}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.subject}</TableCell>
                                <TableCell >{book.grade}</TableCell>
                            </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
                
    )
}

export default StudentPortal;