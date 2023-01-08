import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/Header"
import { Welcome } from "./Containers/Welcome/Welcome"
import { LogIn } from "./Containers/LogIn/LogIn"
import { SignUp } from './Containers/SignUp/SignUp';
import { Search } from './Containers/Search/Search';
import { ImageGeneration } from './Containers/ImageGeneration/ImageGeneration';
import { Detail } from './Containers/Detail/Detail';
import { Favorites } from './Containers/Favorites/Favorites';
import { useThemeContext } from "./Context/theme-context";
import { useAuthContext } from "./Context/auth-context";

function App() {
  const { Theme } = useThemeContext();
  const { isLoggedIn } = useAuthContext();

  return (
    <div className={`App ${isLoggedIn ? "" : "welcome-"}${Theme}-background`}>
      <BrowserRouter>
        <Header />
        <Routes>
          {!isLoggedIn && <>
            <Route path="/" element={<Welcome />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<Welcome />} />
          </>}
          {isLoggedIn && <>
            <Route path="/search" element={<Search />} />
            <Route path="/image-generation" element={<ImageGeneration />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Search />} />
          </>}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
