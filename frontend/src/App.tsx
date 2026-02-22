import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoPage } from "./pages/VideoPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Landing } from "./pages/Landing";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/watch" element={<VideoPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Landing />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
