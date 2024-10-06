import axios from "axios"
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../helpers/endpoints";
import { jwtDecode } from "jwt-decode";
import { SET_CURRENT_USER } from '../actions/types';
import setAuthToken from "../helpers/setAuthToken";


export const loginUser = (userData) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT, userData, {
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
        }).then(response => {
            console.log("Headers de la respuesta: ", response.headers);
            const token = response.headers.authorization;
            const userId = response.headers.userid; // Capturar el userId del header
            const userName = response.headers.username; // Capturar el userName del header
            const userRole = response.headers['userrole']; // Capturar el userRole del header
            const empresaId = response.headers['empresaid']; // Capturar la empresa del usuario del header
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            console.log("Usuario rol cogido del header: "+userRole);

            const decoded = jwtDecode(token);
            decoded.userId = userId; // Añadir userId al objeto decodificado
            decoded.userName = userName;
            decoded.userRole = userRole;
            decoded.empresaId = empresaId;
            console.log("Usuario rol cogido del decoded: "+decoded.userRole);
            dispatch(setCurrentUser({ user: decoded, loggedIn: true }));
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}


export const setCurrentUser = ({ user, loggedIn }) => {
    return {
        type: SET_CURRENT_USER,
        payload: { user, loggedIn }
    };
}

// Acción para cerrar sesión
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({
        user: {},
        loggedIn: false
    }));
}

export const registerUser = (userData) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(REGISTER_ENDPOINT, userData, {
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
        }).then(response => {
            const token = response.headers.authorization;
            const userId = response.headers.userid; // Capturar el userId del header
            const userName = response.headers.username; // Capturar el userName del header
            const userRole = response.headers.userrole; // Capturar el userRole del header
            const empresaId = response.headers['empresaId']; // Capturar la empresa del usuario del header
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);

            const decoded = jwtDecode(token);
            decoded.id = userId; // Añadir userId al objeto decodificado
            decoded.userName = userName;
            decoded.userRole = userRole;
            decoded.empresaId = empresaId;
            dispatch(setCurrentUser({ user: decoded, loggedIn: true }));
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}
