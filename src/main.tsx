import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import MainLayout from "./Pages/MainLayout";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import ProductPage from "./Pages/ProductPage";
import { fetchLuxuryProductsloader } from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {index:true, element: <Home />, loader: fetchLuxuryProductsloader},
      {path:"about", element: <About />},
      {
        path:"shop",
        children:[
          {index:true, element: <Shop />},
          {path:":name", element: <ProductPage name="name" />}
        ]
      },
      {path:"cart", element: <Cart />},
    ]
  },
]);

const root = document.getElementById("root");

createRoot(root).render(
  <RouterProvider router={router} />,
);
