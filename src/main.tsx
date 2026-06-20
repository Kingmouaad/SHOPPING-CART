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
import { StrictMode, createContext, useState } from "react";

export const context = createContext<any>([]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    id:"Main",
    loader: fetchLuxuryProductsloader,
    children:[
      {index:true, element: <Home />},
      {path:"about", element: <About />},
      {
        path:"shop",
        children:[
          {index:true, element: <Shop />},
          {path:":name", element: <ProductPage />}
        ]
      },
      {path:"cart", element: <Cart />},
    ]
  },
]);

const root = document.getElementById("root");

function AppProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any[]>([]);
    return (
        <context.Provider value={{ cart, setCart }}>
            {children}
        </context.Provider>
    );
}

createRoot(root!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
