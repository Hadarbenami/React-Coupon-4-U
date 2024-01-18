import { Category } from "./Category";
import Comapny from "./Comapny";

class Coupon{
    public id: number;
    public company: Comapny | undefined;
    public category: Category | undefined;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public image: string;

    constructor(id: number, company: Comapny, category: Category , title: string, description: string, startDate: Date, endDate: Date, amount: number ,price: number, image: string) {
    
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }
}

export default Coupon;