import './App.css';
import { BrowserRouter, Route, Routes,  } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import DogCreation from "./components/DogCreation"
import Detail from "./components/Detail"

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/dogs" element={<Home />}></Route>
        <Route path="/dogs/creation" element={<DogCreation />}></Route>
        <Route path='/dogs/:id' element={<Detail/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
