import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoPage } from "./pages/VideoPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Landing } from "./pages/Landing";
import { Upload } from "./pages/Upload";
import { Channel } from "./pages/Channel"
import { SearchPage } from "./pages/SearchPage";
import NavBar from "./components/NavBar";
import { MainLayout } from "./layouts/MainLayout";

export function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/watch" element={<VideoPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/channel/:channelName" element={<Channel/>} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
