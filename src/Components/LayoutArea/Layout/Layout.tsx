import { BrowserRouter } from "react-router-dom";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Routing from "../Routing/Routing";
import { RootState, authSlice, authStore } from "../../../Redux/AuthSlice";
import { useSelector } from "react-redux";
import AdminNavbar from "../../AdminArea/AdminNavbar/AdminNavbar";
import { useEffect, useState } from "react";
import User from "../../../Models/User";
import CompanyNavbar from "../../CompanyArea/CompanyNavbar/CompanyNavbar";
import { unsubscribe } from "diagnostics_channel";

function Layout(): JSX.Element {
  
  const [user, setUser]= useState<User>();

  useEffect(() =>{
    if(authStore.getState().auth.user != null){
      setUser(authStore.getState().auth.user);
    } else{
      setUser(null);
    }
    const unsubscribe =  authStore.subscribe(() =>{
      if(authStore.getState().auth.user != null){
        setUser(authStore.getState().auth.user);
      } else{
        setUser(null);
      }
    })
    return()=>{ // return will run this function when this component is destroyed
      unsubscribe();
    }
  }, []);

  
    return (
        <div className="Layout">
		<BrowserRouter>
          {/* <header>
            <Header/>
          </header> */}
          <nav>
            <Navbar/>
          </nav>
          <main>
            
           {user?.role == 'admin' && <AdminNavbar />} 
           {user?.role == 'company' && <CompanyNavbar />} 
            
            <Routing/>
          </main>
            
          <footer>
            <Footer/>
          </footer>
            
          <ToastContainer/>
          </BrowserRouter>
        </div>
    );
}

export default Layout;
