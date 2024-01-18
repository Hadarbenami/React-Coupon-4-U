class AppConfig{

}

class DevAppConfig extends AppConfig{
    public url = "http://localhost:8080/";
}

class TestAppConfig extends AppConfig{
    public url = "http://localhost:8080/";
}

class ProdAppConfig extends AppConfig{
    public url = "http://localhost:8080/";
}
const appConfig = process.env.NODE_ENV === "development" ? new DevAppConfig() 
    : process.env.NODE_ENV === "test" ? new TestAppConfig() : new ProdAppConfig();

export default appConfig;