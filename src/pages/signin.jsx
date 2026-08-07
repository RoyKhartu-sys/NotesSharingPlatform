import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                await checkAuth();
                setMessage("Signed in successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong");
        }
    };
    return (
        <div className="auth-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    Sign In
                </button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/signup")}
                    style={{ cursor: "pointer" }}
                >
                    Sign Up
                </span>
            </p>
        </div>
    );
}
export default Signin;