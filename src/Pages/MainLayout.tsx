import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
export default function MainLayout() {
    return (
        <>
            <Nav/>
            
                <Outlet/>
           
            <Footer/>
        </>
    );
}