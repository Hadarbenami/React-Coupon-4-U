export class User{
    public id: number;
    public name: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;


	constructor(id: number, name: string, firstName: string, lastName: string, email: string, role: string) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role  = role;
    
    }

}

export default User;