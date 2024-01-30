import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import { couponStore } from "../Redux/OurStore";
import { fill } from "../Redux/CompanySlice";

class GeneralService{
    
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url  + "general/getAllCoupons" )).data;
    }
    
   
    public async getCouponById(id: number){
        return (await axios.get<Coupon>(appConfig.url + "general/getOneCoupon/" + id)).data;
    }



}

const generalService = new GeneralService();
export default generalService;