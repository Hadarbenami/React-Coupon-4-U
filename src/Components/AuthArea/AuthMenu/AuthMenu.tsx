import { NavLink, useNavigate } from "react-router-dom";
import "./AuthMenu.css";
import { authStore, couponStore } from "../../../Redux/OurStore";
import authService from "../../../Services/AuthService";
import errorHandler from "../../../Services/ErrorHandler";
import { clear } from "../../../Redux/CouponSlice";

function AuthMenu(): JSX.Element {
    const navigate = useNavigate();

    function logout(){
        authService.logOut()
        .then(() => {
            navigate("/");})

                // couponStore.dispatch(clear());

        //.catch(err => errorHandler.showError(err));
    }
    

    return (
        <div className="AuthMenu">
            {authStore.getState().user === null ? (
                <NavLink id="in" to="auth/login">Login</NavLink>
            ) : (
                <a id="out" onClick={logout}>Logout</a>
            )}
        </div>
    );
}


export default AuthMenu;
