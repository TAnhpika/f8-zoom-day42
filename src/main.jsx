import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import ErrorBoundary from "./components/ErrorBoundary";
import { persistor, store } from "./store/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <ErrorBoundary>
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </ReduxProvider>
    </ErrorBoundary>,
);
