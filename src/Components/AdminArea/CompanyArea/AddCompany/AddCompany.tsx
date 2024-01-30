import "./AddCompany.css";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Company from "../../../../Models/Comapny";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import { Box, Button, FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { authStore } from "../../../../Redux/OurStore";

function AddCompany(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<Company>({mode: "onBlur"}); 
    const navigate = useNavigate();
   
   

    function sendForm(company: Company) {
        adminService.addCompany(company)
            .then(() => {
                toast.success("Company Added!");
                navigate("/admin/getAllCompanies");
            })
            .catch(err => errorHandler.showError(err));
    }

return (
    <div className="AddCompany">
      <br /><br />
      <FormControl>
        <FormLabel id="head">Company Details</FormLabel><br/>
        
            <TextField
              variant="outlined"
              label="Name"
              id="name"
              {...register("name", {
                required: { value: true, message: "*Name is required" },
              })}
            /><br/>
            {formState.errors?.name && (
              <span className="error">{formState.errors?.name.message}</span>
            )}
        
            <TextField
              variant="outlined"
              label="Email"
              id="email"
              {...register("email", {
                required: { value: true, message: "*Email is required" },
              })}
            /><br/>
            {formState.errors?.email && (
              <span className="error">{formState.errors?.email.message}</span>
            )}
         
            <TextField
              variant="outlined"
              label="Password"
              id="password"
              type="password"
              {...register("password", {
                required: { value: true, message: "*Password is required" },
                minLength: { value: 4, message: "*Password must be at least 4 chars" },
              })}
            /><br/>
            {formState.errors?.password && (
              <span className="error">{formState.errors?.password.message}</span>
            )}

        <br />
        <Button size="small" variant="outlined" onClick={handleSubmit(sendForm)}>
          Add Company
        </Button>
      </FormControl>
    </div>
  );
}
export default AddCompany;



