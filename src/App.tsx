import './App.css';
import { useCallback, useEffect } from 'react';
import { getUserData } from "./Services/apicalls";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Components/Header/Header"
import { Welcome } from "./Containers/Welcome/Welcome"
import { LogIn } from "./Containers/LogIn/LogIn"
import { SignUp } from './Containers/SignUp/SignUp';
import { Search } from './Containers/Search/Search';
import { ImageCreator } from './Containers/ImageCreator/ImageCreator';
import { ImageDetail } from './Containers/ImageDetail/ImageDetail';
import { Favorites } from './Containers/Favorites/Favorites';
import { ProfileSettings } from './Containers/ProfileSettings/ProfileSettings';
import { useThemeContext } from "./Context/theme-context";
import { useAuthContext } from "./Context/auth-context";
import { useUserContext } from './Context/user-context';
import { useNotification } from "./Hooks/useNotification";

function App() {
  const { theme } = useThemeContext();
  const { isLoggedIn, token } = useAuthContext();
  const { isUpToDate, populateUserData } = useUserContext();
  const { showErrorNotification } = useNotification();

  const fetchUserData = useCallback(async (token: string) => {
    try {
      populateUserData(await getUserData(token));
    } catch (error) {
      console.error(error);
      showErrorNotification({
        title: "Http requests to load user data failing",
        message: "The stored token has been modified or the server is down",
      });
    }
  }, [populateUserData, showErrorNotification])

  useEffect(() => { //executes twice initially in developement mode due to React.Strict
    if (isLoggedIn && !isUpToDate) {
      fetchUserData(token!);
    }
  }, [fetchUserData, isLoggedIn, isUpToDate, token]);


  return (
    <div className={`App ${isLoggedIn ? "" : "welcome-"}${theme}-background`}>
      <BrowserRouter>
        <Header />
        <Routes>
          {!isLoggedIn && <>
            <Route path="/" element={<Welcome />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>}
          {isLoggedIn && <>
            <Route path="/search" element={<Search />} >
              <Route path=":imageId" element={<ImageDetail />} />
            </Route>
            <Route path="/image-creator" element={<ImageCreator />} >
              <Route path=":imageId" element={<ImageDetail />} />
            </Route>
            <Route path="/favorites" element={<Favorites />} >
              <Route path=":imageId" element={<ImageDetail />} />
            </Route>
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="*" element={<Navigate to="/search" />} />
          </>}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
