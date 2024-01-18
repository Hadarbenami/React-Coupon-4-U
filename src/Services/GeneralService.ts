import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import { couponStore } from "../Redux/OurStore";
import { fill } from "../Redux/CompanySlice";

class GeneralService{
    
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url  + "general/getAllCoupons" )).data;
    }
    
    // public async getAllCoupons():Promise<Coupon[]>{
       
    //     if (couponStore.getState().value.length == 0){
    //         const response = await axios.get<Coupon[]>(appConfig.url  + "general/getAllCoupons" );
    //         couponStore.dispatch(fill(response.data));
    //         return response.data;
    //     }else{
    //         return couponStore.getState().value;
    //     }
    // }
    public async getCouponById(id: number){
        return (await axios.get<Coupon>(appConfig.url + "general/getOneCoupon/" + id)).data;
    }

    // public async getCouponById(id: number){
    //     // const response = await axios.get<Supplier>(appConfig.url + "/Supplier/" + id);
    //     // return response.data;
    //     if (couponStore.getState().value.length == 0)
    //         return (await axios.get<Coupon>(appConfig.url + "general/getOneCoupon/" + id));
        
    //     return couponStore.getState().value.find(c=>c.id == id);
            
    // }

}

const generalService = new GeneralService();
export default generalService;