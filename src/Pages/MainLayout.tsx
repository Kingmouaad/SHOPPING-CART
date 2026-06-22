import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

export default function MainLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Nav/>
            
                <Outlet/>
           
            <Footer/>
        </>
    );
}