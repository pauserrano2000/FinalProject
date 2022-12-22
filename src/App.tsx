import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { ThemeContextProvider } from "./Context/theme-context";
import { Header } from "./Components/Header/Header"

function App() {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ThemeContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              {/*<Route path="/" element={<Home />} />*/}
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
