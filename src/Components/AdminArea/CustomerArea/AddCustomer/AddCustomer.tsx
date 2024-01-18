import { useForm } from "react-hook-form";
import "./AddCustomer.css";
import Customer from "../../../../Models/Customer";
import { useNavigate } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import { toast } from "react-toastify";
import errorHandler from "../../../../Services/ErrorHandler";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";


function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<Customer>({mode: "onBlur"}); 
    const navigate = useNavigate();

    function sendForm(customer: Customer){
        adminService.addCustomer(customer)
        .then( () => {toast.success("Customer Adedd!") ;navigate("/admin/getAllCustomers")})
        .catch(err => errorHandler.showError(err))
    }

return (
    <div className="AddCustomer">
      <br /><br />
      <FormControl>
        <FormLabel id="head">Customer Details</FormLabel><br/>
        
            <TextField
              variant="outlined"
              label="First Name"
              id="firstName"
              {...register("firstName", {
                required: { value: true, message: "*First Name is required" },
              })}
            /><br/>
            {formState.errors?.firstName && (
              <span className="error">{formState.errors?.firstName.message}</span>
            )}

            <TextField
              variant="outlined"
              label="Last Name"
              id="lastName"
              {...register("lastName", {
                required: { value: true, message: "*Last Name is required" },
              })}
            /><br/>
            {formState.errors?.lastName && (
              <span className="error">{formState.errors?.lastName.message}</span>
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
          Add Customer
        </Button>
      </FormControl>
    </div>
  );
}
export default AddCustomer;
