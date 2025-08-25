import React from "react";
import { useNavigate , useRoutes} from 'react-router-dom';

//pages List
import { Profile, Dashboard, Login, Signup } from "./components";

import { useAuth } from "./context/authContext";

export const ProjectRoutes =()=>{
    const {currentUser, setCurrentUser}= useAuth();
    const navigate= useNavigate();

    React.useEffect(()=>{
        const userIdFromStorage =localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser)
        {
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage && !["/auth","signup"].includes(window.location.pathname))
        {
            navigate("/auth");
        }

        if(userIdFromStorage &&window.location.pathname== '/auth')
        {
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        },
    ]);

    return element;
}