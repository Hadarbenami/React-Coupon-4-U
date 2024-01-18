import axios from "axios";
import Company from "../Models/Comapny";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import { Category } from "../Models/Category";

class CompanyService{

    public async getCompany(){
       const response =  await axios.get<Company>(appConfig.url  + "company/getCompanyDetails" )
        return response.data;
    
    }


    public async getCompanyCoupons(){
        const response = await axios.get<Coupon[]>(appConfig.url  + "company/getCompanyCoupons" );
        return response.data;
    }

    public async getCouponsByCategory(category: Category){
        return (await axios.get<Coupon[]>(appConfig.url  + "company/getCouponsByCategory/" + category )).data;
    }

    public async getCouponsByMaxPrice(price: number){
        return (await axios.get<Coupon[]>(appConfig.url  + "company/getCouponsByMaxPrice/" + price )).data;
    }

    public async addCoupon(coupon: Coupon){
        return (await axios.post<string>(appConfig.url + "company/addCoupon" , coupon)).data;
    }

    public async updateCoupon(coupon: Coupon){
        return (await axios.put<string>(appConfig.url + "company/updateCoupon" , coupon)).data;
    }

    public async deleteCoupon(id: number){
        return (await axios.delete<string>(appConfig.url + "company/deleteCoupon/" + id)).data;
    }
}

const companyService = new CompanyService();
export default companyService;