import { HashRouter, Route, Routes } from "react-router";
import Counter from "@/pages/Counter";
import ProductList from "@/pages/ProductList";
import DemoAssets from "@/pages/DemoAssets";
import Icons from "@/pages/Icons";
import ProvincesList from "@/pages/Address/ProvincesList";
import ProvincesList2 from "@/pages/Address/ProvincesList2";
import Header from "../Header";
import AuthProvider from "../AuthProvider";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";

export default function AppRoutes() {
    return (
        <HashRouter>
            <AuthProvider />
            <Header />
            <Routes>
                <Route path="/" element={<Counter />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/address/provinces" element={<ProvincesList />} />
                <Route
                    path="/address/provinces2"
                    element={<ProvincesList2 />}
                />

                <Route path="/assets" element={<DemoAssets />} />
                <Route path="/icons" element={<Icons />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    );
}
