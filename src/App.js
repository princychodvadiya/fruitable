import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes";
import UserRoutes from "./Routes/UserRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<UserRoutes />} />
        <Route exact path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>

  );
}

export default App;
