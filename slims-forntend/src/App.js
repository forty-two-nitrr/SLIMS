import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.js";
import Map from "./components/Map";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "map",
    element: <Map />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
