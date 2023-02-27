import { ThemeProvider } from "./context/Theme/ThemeProvider";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import Hi from "./Hi";
const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hi />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
