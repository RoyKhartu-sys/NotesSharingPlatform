import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };
    if (loading) {
        return (
            <header>
                <nav>
                    <h2>NotesSharing</h2>
                </nav>
            </header>
        );
    }
    return (
        <header>
            <nav>
                <h2>NotesSharing</h2>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/upload">Upload</a>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <a href="/signup">Sign Up</a>
                            </li>
                            <li>
                                <a href="/signin">Sign In</a>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <span>
                                    Hello, {user.name}
                                </span>
                            </li>
                            <li>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
export default Navbar;