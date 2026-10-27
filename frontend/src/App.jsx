import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AuthGuard from "./components/AuthGuard";
import MessagePage from "./Pages/MessagePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Messages from "./Pages/MessagePage";
 

export default function App() {
  return(
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<AuthGuard />}>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                    </Route>
                    <Route path="/:username" element={<MessagePage />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}