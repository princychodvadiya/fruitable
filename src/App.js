import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<UserRoutes />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
