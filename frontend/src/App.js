import "./App.css";
import { Route, Routes, useLocation , BrowserRouter} from "react-router-dom";
import Home from "./components/Home";
// import BrowserR

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
