import Coupon from "./Coupon";

class Company{

    public id: number;
    public name: string;
    public email: string;
    public password: string;
    // public coupons: Coupon[] = [];

    constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        // this.coupons = coupons;
    }
}

export default Company;

