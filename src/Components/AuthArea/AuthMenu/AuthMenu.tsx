import { NavLink, useNavigate } from "react-router-dom";
import "./AuthMenu.css";
import { authStore, logout } from "../../../Redux/AuthSlice";
import authService from "../../../Services/AuthService";
import errorHandler from "../../../Services/ErrorHandler";

function AuthMenu(): JSX.Element {
    const navigate = useNavigate();

    function logout(){
        authService.logOut()
        .then(() => navigate("/"))
        .catch(err => errorHandler.showError(err));
    }
    

    return (
        <div className="AuthMenu">
            {authStore.getState().auth.user == null ? (
                <NavLink id="in" to="auth/login">Login</NavLink>
            ) : (
                <a id="out" onClick={logout}>Logout</a>
            )}
        </div>
    );
}


export default AuthMenu;
