import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router";

// K lazy load
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

// pages lazy load
const Counter = lazy(() => import("@/pages/Counter"));
const ProductList = lazy(() => import("@/pages/ProductList"));
const DemoAssets = lazy(() => import("@/pages/DemoAssets"));
const Icons = lazy(() => import("@/pages/Icons"));
const ProvincesList = lazy(() => import("@/pages/Address/ProvincesList"));
const ProvincesList2 = lazy(() => import("@/pages/Address/ProvincesList2"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const PortalDemo = lazy(() => import("@/pages/PortalDemo"));

// Components
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";

import { httpClient } from "@/utils/http";
import UseReducer from "@/pages/UseReducer";

export default function AppRoutes() {
    useEffect(() => {
        httpClient.get("/auth/devices");
    }, []);

    return (
        <HashRouter>
            <AuthProvider />
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/portal-demo" element={<PortalDemo />} />
                    <Route path="/use-reducer" element={<UseReducer />} />

                    <Route path="/products" element={<ProductList />} />
                    <Route
                        path="/address/provinces"
                        element={<ProvincesList />}
                    />
                    <Route
                        path="/address/provinces2"
                        element={<ProvincesList2 />}
                    />

                    <Route path="/assets" element={<DemoAssets />} />
                    <Route path="/icons" element={<Icons />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Suspense>
        </HashRouter>
    );
}
