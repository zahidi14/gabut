import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Conf";
function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
