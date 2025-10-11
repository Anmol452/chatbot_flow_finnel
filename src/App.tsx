

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        ok
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
