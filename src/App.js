import "./App.scss";
import { AllRoutes } from "./routes/AllRoutes";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <AllRoutes />
    </div>
  );
}

export default App;
