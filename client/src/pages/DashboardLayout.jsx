import {Outlet, redirect, useLoaderData, useNavigate, useNavigation} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard.js';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components/index.js';
import { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App.jsx';
import axios from "axios";
import {toast} from "react-toastify";

export const dashboardLoader = async ()=>{
  try {
    const res = await axios.request({
      method:"get",
      url:"api/user/current",
    })
    return res.data
  }catch (e) {
      return redirect("/")
  }
}

const DashboardContext = createContext();

const DashboardLayout = () => {
  const userData = useLoaderData()
  const navigation = useNavigation();
  const navigate = useNavigate()
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutHandler = async () => {
    try {
      await axios.request({
        url:"api/auth/logout",
        method:"get"
      })
      navigate("/")
    }catch (e) {
      toast.error(e.response.data.message || e.message)
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        user:userData.user,
        logoutHandler,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{user:userData.user}}/>}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
