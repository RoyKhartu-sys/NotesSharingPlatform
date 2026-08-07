import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Upload from "./pages/upload";
import Footer from "./components/footer";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;