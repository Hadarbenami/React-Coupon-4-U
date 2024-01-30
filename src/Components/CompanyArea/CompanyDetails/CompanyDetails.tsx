import { useNavigate, useParams } from "react-router-dom";
import "./CompanyDetails.css";
import { useEffect, useState } from "react";
import Company from "../../../Models/Comapny";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Services/ErrorHandler";
import companyService from "../../../Services/CompanyService";


function CompanyDetails(): JSX.Element {

    const params = useParams();
    const id: number = +params.supId!;
    const navigate = useNavigate();

    const[company, setCompany] = useState<Company>();

    useEffect(()=>{
        companyService.getCompany()
            .then(c => setCompany(c))
            .catch(err => errorHandler.showError(err))
    }, []);
    companyService.getCompany()
    return (
        <div className="CompanyDetails">
			<h2>{company?.name}</h2>
            <p>Email: {company?.email}</p>
            <p>Password: {company?.password}</p>
        </div>
    );
}

export default CompanyDetails;
