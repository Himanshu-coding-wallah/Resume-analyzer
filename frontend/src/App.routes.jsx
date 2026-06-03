import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./features/auth/pages/Register.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Protected from "./features/auth/components/Protected.jsx";

export const appRouter = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element:<Protected><h1>Home page</h1></Protected> 
    }
])
