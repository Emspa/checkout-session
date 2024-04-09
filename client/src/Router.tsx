import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Confirmation } from "./pages/Confirmation";
import { ProductDetail } from "./pages/ProductDetail";



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
            {
                path: '/confirmation',
                element: <Confirmation />,

            }, 
            {
                path: '/product/:productId', 
                element: <ProductDetail />,
              },
        ]

    }
])