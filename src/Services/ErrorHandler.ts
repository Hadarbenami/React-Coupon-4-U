import { toast } from "react-toastify";

class ErrorHandler{
    public showError(err: any){
        if(typeof(err) == 'string'){
            toast.error(err);
        }else if(err.response){
            toast.error(err.response.data);
        }else if(err.massage){
            toast.error(err.massage);
        }else{
            console.log(err);
            toast.error("Oops! sonthing went wrong...")
        }
    
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;