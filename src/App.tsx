import { ThemeProvider } from "./context/Theme/ThemeProvider";
import RouteComponent from "./RouteComponent";
const App = () => {
  return (
    <ThemeProvider>
      <RouteComponent />
    </ThemeProvider>
  );
};

export default App;
