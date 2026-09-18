import { HashRouter, Route, Routes } from "react-router";
import Counter from "@/pages/Counter";
import ProductList from "@/pages/ProductList";
import DemoAssets from "@/pages/DemoAssets";
import Icons from "@/pages/Icons";
import ProvincesList from "@/pages/Address/ProvincesList";

export default function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Counter />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/address/provinces" element={<ProvincesList />} />
                
                <Route path="/assets" element={<DemoAssets />} />
                <Route path="/icons" element={<Icons />} />
            </Routes>
        </HashRouter>
    );
}
