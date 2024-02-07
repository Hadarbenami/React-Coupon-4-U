import axios from "axios";
import Company from "../Models/Comapny";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import { Category } from "../Models/Category";
import { couponStore } from "../Redux/OurStore";
import { fill, update, remove, add } from "../Redux/CouponSlice";


class CompanyService{

    public async getCompany(){
       const response =  await axios.get<Company>(appConfig.url  + "company/getCompanyDetails" )
        return response.data;
    
    }


    public async getCompanyCoupons(){
        if(couponStore.getState().value.length == 0){
            const response = (await axios.get<Coupon[]>(appConfig.url + "company/getCompanyCoupons" ))
            couponStore.dispatch(fill(response.data));
            return response.data;
        }else{
            return couponStore.getState().value;
        }
    }

    public async getCouponsByCategory(category: Category){
        //return (await axios.get<Coupon[]>(appConfig.url  + "company/getCouponsByCategory/" + category )).data;
        return couponStore.getState().value.filter(coupon => coupon.category === category);
    }

    public async getCouponsByMaxPrice(price: number){
        //return (await axios.get<Coupon[]>(appConfig.url  + "company/getCouponsByMaxPrice/" + price )).data;
        return couponStore.getState().value.filter(coupon => coupon.price <= price);
    }

    public async addCoupon(coupon: Coupon){
        const response = await axios.post<Coupon>(appConfig.url + "company/addCoupon" , coupon);
        couponStore.dispatch(add(response.data));
        return response.data;
    }

    public async updateCoupon(coupon: Coupon){
        const response =  (await axios.put<string>(appConfig.url + "company/updateCoupon" , coupon))
        couponStore.dispatch(update(coupon));
        return response.data;
        
    }

    public async deleteCoupon(id: number){
        const response =  (await axios.delete<string>(appConfig.url + "company/deleteCoupon/" + id))
        couponStore.dispatch(remove(id));
        return response.data;

    }
}

const companyService = new CompanyService();
export default companyService;