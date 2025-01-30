import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./context/store";
import "./App.scss";
import "antd/dist/reset.css";
import AppLayout from "./layout/appLayout";
import WelcomeScreen from "./components/welcomScreen/welcomeScreen";
import LoginComponent from "./components/login/login";
import SignupComponent from "./components/Signup/Signup";
import useSocketService from "./utils/SoketServices";
import HomeComponent from "./pages/home/home";
import { Spin } from "antd";
import axiosService from "./utils/axiosService";
import { selectUserState, setUser } from "./context/user/userSlice";
import LoginLayout from "./layout/loginLayout";
import { getUserThunk } from "./context/user/userThunk";
import KycVerifyComponent from "./components/KycVerify/KycVerify";
import ProfileComponent from "./pages/profile/profile";
import EditProfileComponent from "./components/EditProfile/EditProfile";
import "./i18n";
import Wallet from "./pages/Wallet/wallet";
import Transactions from "./pages/transactions/Transactions";
import WithdrawlDetails from "./pages/withdrawldetails/withdrawldetails";
import AddMoney from "./pages/addmoney/addmoney";
import DepositSuccessful from "./pages/depositsuccessful/depositsuccessful";
import ManageAccount from "./pages/managepaymentmethod/manageaccount";
import AddCrypto from "./components/managepaymentmotheds/addcrypto";
import AddBankaccount from "./pages/addbankaccount/addbankaccount";
import HowToPlay from "./pages/howtoplay/howtoplay";
import HelpandSupport from "./pages/helpandsupport/helpandsupport";
import InviteFriends from "./pages/invitefriends/invitefriends";
import ComingSoon from "./pages/comingsoon/comingsoon";

function App() {
  const socketService = useSocketService();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const socketId = await socketService.initializeSocket();
      } catch (error) {
        console.error("Socket initialization failed:", error);
      }
    };

    if (userId) {
      initializeSocket();
    }
  }, [socketService, userId]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<LoginLayout />}>
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/profile" element={<ProfileComponent />} />
                <Route
                  path="/edit-profile"
                  element={<EditProfileComponent />}
                />
                {/* jaswant */}
              </Route>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/howtoplay" element={<HowToPlay />} />
              <Route path="/helpandsupport" element={<HelpandSupport />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/withdrawldetails" element={<WithdrawlDetails />} />
              <Route path="/addmoney" element={<AddMoney />} />
              <Route path="/invitefriends" element={<InviteFriends />} />
              <Route path="/comingsoon" element={<ComingSoon />} />
              <Route
                path="/depositsuccessful"
                element={<DepositSuccessful />}
              />
              <Route path="/managepaymentmethod" element={<ManageAccount />} />
              <Route path="/addcrypto" element={<AddCrypto />} />
              <Route path="/addbankaccount" element={<AddBankaccount />} />
              <Route path="/kyc" element={<KycVerifyComponent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { userInfo, userStatus } = useSelector(selectUserState);

  useEffect(() => {
    if (token && userStatus === "idle") {
      dispatch(getUserThunk({}));
    }
  }, [token, userStatus, dispatch]);

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return userInfo ? <Outlet /> : <Navigate to="/" />;
};
