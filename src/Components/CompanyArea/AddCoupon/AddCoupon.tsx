import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Grid, Input, MenuItem, Select, TextField } from "@mui/material";
import companyService from "../../../Services/CompanyService";
import { toast } from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { authStore } from "../../../Redux/OurStore";
import { Category } from "../../../Models/Category";
import { blob } from "stream/consumers";
import { readAndCompressImage } from "browser-image-resizer";



function AddCoupon(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Coupon>({ mode: "onBlur" });
    const navigate = useNavigate();
    const company = authStore.getState().user;


    const convertToBase64 = (blob: Blob) => {
      return new Promise(resolve => {
        var render = new FileReader();
        render.onload = function(){
          resolve(render.result);
        };
        render.readAsDataURL(blob);
      })
    };
    async function sendForm(coupon: Coupon) {
      coupon.company = company;
    
      if ((coupon.image as FileList).length > 0) {
        let image = await readAndCompressImage((coupon.image as FileList)[0]);
        coupon.image = await convertToBase64(image);
      }else{
        coupon.image = "";
      }
    
      console.log(coupon);
      
      companyService.addCoupon(coupon)
        .then(coup => { toast.success("Coupon Added!"); navigate("/company/getCompanyCoupons") })
        .catch(err => errorHandler.showError(err));
    }

    // async function sendForm(coupon: Coupon){
    //   coupon.company = company;
    //   if(coupon.image){
    //     // coupon.image = (coupon.image as FileList)[0]; 
    //     // let render = new FileReader();
    //     // render.readAsDataURL(coupon.image);
    //     // render.onload = function(){
    //     //   console.log(render.result);
         
    //     //   coupon.image = render.result;
    //       let image = await readAndCompressImage((coupon.image as FileList)[0]);
    //       coupon.image = await convertToBase64(image);
    //       console.log(coupon);
    //       companyService.addCoupon(coupon)
    //       .then( coup => {toast.success("Coupon Adedd!"); navigate("/company/getCompanyCoupons") })
    //       .catch(err => errorHandler.showError(err))
    //     }
    //     render.onerror = function(error){
    //     console.log("Error: ", error);  

    //     };
        
    //   else{
    //   companyService.addCoupon(coupon)
    //     .then( coup => {toast.success("Coupon Adedd!"); navigate("/company/getCompanyCoupons") })
    //     .catch(err => errorHandler.showError(err))
    //   }
    // }

return (
    <div className="AddCoupon">
            <br /><br />
        <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer components={['DateField', 'DateField']} >
         <Grid container spacing={2}>
         <Grid item xs={6}>
        <FormLabel id="head">Coupon Details</FormLabel><br />
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    {...register("title", {
                        required: '*Title field is required',
                    })}
                /><br/>
                {formState.errors?.title && (
                    <span className="error">{formState.errors?.title.message}</span>
                )}
            </Grid>

            <Grid item xs={6}>
                <TextField
                variant="outlined"
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: '*Start Date field is required',
                })}
                
               /> <br />
                {formState.errors?.startDate && (
                  <span className="error">{formState.errors?.startDate.message}</span>
                )}
              </Grid>
            

            {/* Second row */}
            <Grid item xs={6}>
                <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    type="number"
                    {...register("amount", {
                        required: '*Amount field is required',
                        min: { value: 1, message: 'Amount must be greater than 0' },
                    })}
                /><br/>
                {formState.errors?.amount && (
                    <span className="error">{formState.errors?.amount.message}</span>
                )}
            </Grid>

            <Grid item xs={6}>
              
              <TextField
                variant="outlined"
                id="endtDate"
                type="date"
                {...register("endDate", {
                  required: '*End Date field is required',
                })}
                
               /> <br />
               
                {formState.errors?.endDate && (
                  <span className="error">{formState.errors?.endDate.message}</span>
                )}
              </Grid>

      

            <Grid item xs={6}>
                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    {...register("description", {
                        required: '*Description field is required',
                    })}
                /><br/>
                {formState.errors?.description && (
                    <span className="error">{formState.errors?.description.message}</span>
                )}
            </Grid>
  
             
  
              <Grid item xs={6}>
              <Select
                placeholder="category"
                defaultValue={Category.FOOD}
                {...register("category", {
                    required: '*Category field is required',
                })}
                sx={{ width: '228px' }}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
            >
                <MenuItem value={Category.FOOD}>Food</MenuItem>
                <MenuItem value={Category.CLOTHING}>Clothing</MenuItem>
                <MenuItem value={Category.ELECTRONICS}>Electronics</MenuItem>
                <MenuItem value={Category.JEWELRY}>Jewelry</MenuItem>
                <MenuItem value={Category.MAKEUP}>Makeup</MenuItem>
                <MenuItem value={Category.CARE}>Care</MenuItem>
            </Select><br />
            {formState.errors?.category && (
                  <span className="error">{formState.errors?.category.message}</span>
                )}
              </Grid>
             
              <Grid item xs={6}>
                <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    type="number"
                    {...register("price", {
                        required: '*Price field is required',
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: 'Enter a valid number with up to 2 decimal places',
                        },
                    })}
                    /><br/>
                    {formState.errors?.price && (
                        <span className="error">{formState.errors?.price.message}</span>
                    )}
            </Grid>
  
             
  
              <Grid item xs={6}>
                <Input type= "file" id="image" {...register("image")} />
              </Grid>
             
            </Grid>
          </DemoContainer>
        </LocalizationProvider>
  
        <br /><br /><br /><br />
        <Grid>
          <Button id="btn" variant="outlined" onClick={handleSubmit(sendForm)}>
            Add Coupon
          </Button>
        </Grid>
      </FormControl>
    </div>
  );
}



export default AddCoupon;



