import { jwtDecode } from "jwt-decode"
import store from "../store"
import { logoutUser, setCurrentUser } from "../actions/authActions";
import setAuthToken from "./setAuthToken";


const checkForToken = () => {
    if(localStorage.jwtToken) {

        setAuthToken(localStorage.jwtToken);

        const decoded = jwtDecode(localStorage.jwtToken);
        store.dispatch(setCurrentUser({
            user: decoded,
            loggedIn: true
        }));

        const currentTime = Math.floor(Date.now()/1000);
        if(decoded.exp < currentTime){
            store.dispatch(logoutUser());
            window.location.href = "/signin";
        }
    }
}

export default checkForToken;