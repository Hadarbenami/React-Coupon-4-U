class Credentials{
    public email:string;
    public password: string;
    public clientType: string;


	constructor(email: string, password: string, clientType: string) {
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }

}
export default Credentials;