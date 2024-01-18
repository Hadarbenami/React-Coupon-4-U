import axios from "axios";
import { ClientType } from "../Models/ClientType";
import appConfig from "../Utils/AppConfig";
import { authStore, login, logout } from "../Redux/AuthSlice";
import Credentials from "../Models/Credentials";

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
        authStore.dispatch(logout());
    }
}

const authService = new AuthService();
export default authService;