import axios from "axios";
import { ClientType } from "../Models/ClientType";
import appConfig from "../Utils/AppConfig";
import { login, logout } from "../Redux/AuthSlice";
import Credentials from "../Models/Credentials";
import { authStore, couponStore } from "../Redux/OurStore";
import { clear } from "../Redux/CouponSlice";

class AuthService {
    public async login(cred: Credentials): Promise<string> {
          const response = (await axios.post<string>(appConfig.url + "auth/login",
                {
                    email: cred.email,
                    password: cred.password,
                    clientType: cred.clientType
                }));

           
            // console.log(response.data);
            // const token: string = response.data;
            authStore.dispatch(login(response.data));
    
            // localStorage.setItem("token", token);
            //console.log(authStore.getState());

             return response.data;
       
    }

    public async logOut(){
        const response = await axios.post<string>(appConfig.url + "auth/logout");
        // couponStore.dispatch(clear());
        authStore.dispatch(logout());
        couponStore.dispatch(clear());

    }
}

const authService = new AuthService();
export default authService;