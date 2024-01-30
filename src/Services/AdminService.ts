import axios from "axios";
import Company from "../Models/Comapny";
import { companyStore } from "../Redux/OurStore";
import appConfig from "../Utils/AppConfig";
import { add, fill, remove, update } from "../Redux/CompanySlice";
import Customer from "../Models/Customer";

class AdminService{

    //get all
    public async getAllCompanies(){   // redux
        if(companyStore.getState().value.length == 0){
            //console.log(authStore.getState());
            
            const response = (await axios.get<Company[]>(appConfig.url + "admin/getAllCompanies"))
            companyStore.dispatch(fill(response.data));
            return response.data;
        }else{
            return companyStore.getState().value;
        }
        
    }

    public async getAllCustomers(){
         const response =  await axios.get<Customer[]>(appConfig.url + "admin/getAllCustomers");
         return response.data;
    }

    

    // add
    public async addCompany(company: Company){    // redux
        const response = await axios.post<Company>(appConfig.url + "admin/addCompany", company);
        companyStore.dispatch(add(response.data));
        console.log(response.data);
        return response.data; 
    }

    public async addCustomer(customer: Customer){
        const response =  (await axios.post<string>(appConfig.url + "admin/addCustomer", customer));
        
        
        return response.data;
    }



    //get one
    public async getOneCompany(id: number){    // redux
        if(companyStore.getState().value.length == 0)
            return (await axios.get<Company>(appConfig.url + "admin/getOneCompany/"+ id)).data;
        return companyStore.getState().value.find(c => c.id == id);
            
    }

    public async getOneCustomer(id: number){
        return (await axios.get<Customer>(appConfig.url + "admin/getOneCustomer/" + id )).data;
    }



    //delete
    public async deleteCompany(id: number){   // redux
        const data =  (await axios.delete(appConfig.url + "admin/deleteCompany/"+ id)).data;
        companyStore.dispatch(remove(id));
        return data;
    }

    public async deleteCustomer(id: number){
        return (await axios.delete<string>(appConfig.url + "admin/deleteCustomer/" + id)).data;
    }



    //update
    public async updateCompany(company: Company){    // redux
        const response = (await axios.put<Company>(appConfig.url + "admin/updateCompany", company));
        companyStore.dispatch(update(company));
        return response.data;
    }

    public async updateCustomer(customer: Customer){
        const response =  (await axios.put<string>(appConfig.url + "admin/updateCustomer" , customer));
        return response.data;
    }
}

const adminService = new AdminService();
export default adminService;