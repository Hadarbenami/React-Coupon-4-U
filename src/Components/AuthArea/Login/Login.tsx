import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import appConfig from "../../../Utils/AppConfig";
import "./Login.css";
import errorHandler from "../../../Services/ErrorHandler";
import { useNavigate } from "react-router-dom";
import Credentials from "../../../Models/Credentials";
import AdminNavbar from "../../AdminArea/AdminNavbar/AdminNavbar";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { authStore } from "../../../Redux/OurStore";


function Login(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<Credentials>({mode: "onBlur"});
    const navigate = useNavigate();

   function doLogin(creds: Credentials){
        authService.login(creds)
            .then(() => {
                
                if(creds.clientType == "ADMINISTRATOR"){
                    toast.success("Welcome back Admin")
                    navigate("/admin/getAllCompanies")
                }
                else if(creds.clientType == "COMPANY"){
                    toast.success("Welcome back " + authStore.getState().user.name);
                    navigate("/company/getCompanyCoupons")
                }
                else if(creds.clientType == "CUSTOMER"){
                    toast.success("Welcome back " + authStore.getState().user.firstName + " " + authStore.getState().user.lastName);
                    navigate("/customer/getAllCoupons")
                }
               
            })
            .catch(err => errorHandler.showError(err));
            
                
            
            
   }

    return (
        <div className="Login">
            <br/><br/>
            <FormControl>
            <FormLabel id="head">Login Details</FormLabel><br/>
                <TextField variant="outlined" label="Email" id="email" {...register("email",
                                {required: {value: true, message: "*Email is required"}})} /> <br />
                {formState.errors?.email && <><span className="error">{formState.errors?.email.message}</span><br/></>}
                <TextField variant="outlined" label="Password" id="password" type="password"{...register("password",
                                {required: {value: true, message: "*Password is required"},
                                minLength: {value: 4, message: "*Password must be as least 4 chars"}})} /> <br />
                {formState.errors?.password && <><span className="error">{formState.errors?.password.message}</span><br/></>}
                <RadioGroup id="clientType" 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    {...register("clientType",  {required: {value: true, message: "*ClientType is required"}})}
                    
                >
                    <FormControlLabel value="ADMINISTRATOR" control={<Radio />} label="Administrator" {...register("clientType")}/>
                    <FormControlLabel value="COMPANY" control={<Radio />} label="Company"{...register("clientType")} />
                    <FormControlLabel value="CUSTOMER" control={<Radio />} label="Customer"{...register("clientType")} />
                    {formState.errors?.clientType && <><span className="error">{formState.errors?.clientType.message}</span><br/></>}
                </RadioGroup><br/>
                <Button variant="outlined" onClick={handleSubmit(doLogin)}>Login</Button>
            </FormControl>
			
        </div>
    );
}

export default Login;
