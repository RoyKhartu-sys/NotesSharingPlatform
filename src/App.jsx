import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Upload from "./pages/upload";
import Footer from "./components/footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return <Navigate to="/signin" />;
    }
    return children;
}
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={<Hero />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup />}
                    />
                    <Route
                        path="/signin"
                        element={<Signin />}
                    />
                    <Route
                        path="/upload"
                        element={
                            <ProtectedRoute>
                                <Upload />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}
export default App;