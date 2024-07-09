import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Users from "../pages/dashboard/Users";
import Home from "../pages/Home";
import Draws from "../pages/dashboard/Draws";
import UserDetail from "../pages/dashboard/UserDetail";
import DrawDetail from "../pages/dashboard/DrawDetail";
import Profile from "../pages/dashboard/Profile";
import GameSetting from "../pages/dashboard/GameSetting";

const AppNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/:wallet" element={<UserDetail />} />
        <Route path="/dashboard/draws" element={<Draws />} />
        <Route path="/dashboard/draws/:drawId" element={<DrawDetail />} />
        <Route path="/dashboard/setting" element={<GameSetting />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppNavigation;