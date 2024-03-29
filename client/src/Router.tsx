import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";



export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Products />,
                index: true,

            }, 
            {
                path: '/login',
                element: <Login />,

            }, 
            {
                path: '/cart',
                element: <Cart />,

            }, 
        ]

    }
])