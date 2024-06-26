import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./Routing.css";
import Copmanies from "../../AdminArea/CompanyArea/Copmanies/Copmanies";

import Home from "../../MainArea/Home/Home";
import Customers from "../../AdminArea/CustomerArea/Customers/Customers";
import AddCompany from "../../AdminArea/CompanyArea/AddCompany/AddCompany";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import AdminNavbar from "../../AdminArea/AdminNavbar/AdminNavbar";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import AddCustomer from "../../AdminArea/CustomerArea/AddCustomer/AddCustomer";
import Login from "../../AuthArea/Login/Login";
import Coupons from "../../GeneralArea/Coupons/Coupons";
import CouponDetails from "../../GeneralArea/CouponDetails/CouponDetails";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import CusCoupons from "../../CustomerArea/Coupons/MyCoupons";
import Purchase from "../../CustomerArea/Purchase/Purchase";
import MyCoupons from "../../CustomerArea/Coupons/MyCoupons";
import { useEffect, useState } from "react";
import User from "../../../Models/User";
import { authStore } from "../../../Redux/OurStore";

function Routing(): JSX.Element {
    //const user = authStore.getState().user?.role;
    const [user, setUser] = useState<User>();
    
    useEffect(()=>{
        
        setUser(authStore.getState().user)
        console.log(authStore.getState().user);
      

        authStore.subscribe( () =>{
            setUser(authStore.getState().user)
            console.log("subscribe",authStore.getState().user);
            console.log(user);
        
            
        });
    
        
    },[])
    return (
        <div className="Routing">
            

            <Routes>
                <Route path="/" element={<Coupons/>}/>
                <Route path="auth/login" element= {<Login/> }/>
                
                <Route path="/couponDetails/:couponId" element={<CouponDetails/>} />

               
                
                
                {user?.role === 'admin' &&(
                    <>
                        <Route path="admin/getAllCompanies" element={<Copmanies />} />
                        <Route path="admin/addCompany" element={<AddCompany />} />
                        <Route path="admin/getAllCustomers" element={<Customers />} />
                        <Route path="admin/addCustomer" element={<AddCustomer />} />
                        <Route path="*" element= {<Login/>}/>

                    </>
                )}
               

                {user?.role === 'company' && (
                    <>
                        <Route path="company/getCompanyDetails" element={<CompanyDetails/>} />
                        <Route path="company/getCompanyCoupons" element={<CompanyCoupons/>} />
                        <Route path="company/addCoupon" element={<AddCoupon/>} />
                        <Route path="company/updateCoupon/:couponId" element={<UpdateCoupon/>} />
                    </>
                )}
                

                {user?.role === 'customer' && (
                    <>
                        <Route path="customer/getAllCoupons" element={<Coupons/>} /> 
                        <Route path="customer/purchaseCoupon/:couponId" element={<Purchase/>} />
                        <Route path="customer/getMyCoupons" element={<MyCoupons/>} /> 
                    </>
                )}
               

                <Route path="/" element= {<Login/>}/> 
                <Route path="*" element= {<p>Page not found...</p>}/>
                

                
                
            </Routes>
			
        </div>
    );
}

export default Routing;
