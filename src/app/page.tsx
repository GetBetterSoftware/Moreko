import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/Dashboard";
import PublicSite from "./components/PublicSite";
import UserAuth from "./components/UserAuth";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">   
        {/* <PublicSite/> */}
        <Dashboard/>
    </div>
  );
}
