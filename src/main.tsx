import ReactDOM from "react-dom/client";
import router from "./routes/index.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persister = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
