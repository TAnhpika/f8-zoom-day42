import { HashRouter, Route, Routes } from "react-router";
import Counter from "@/pages/Counter";
import ProductList from "@/pages/ProductList";
import DemoAssets from "@/pages/DemoAssets";

export default function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Counter />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/assets" element={<DemoAssets />} />
            </Routes>
        </HashRouter>
    );
}
