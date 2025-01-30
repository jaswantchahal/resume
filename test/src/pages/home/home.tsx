import React from "react";
import TopBar from "../../components/Topbar/Topbar";
import KycModal from "../../components/KycModal/KycModal";
import Slider from "../../components/Slider/Slider";
import OurGamesComponent from "../../components/OurGames/OurGames";
import { useSelector } from "react-redux";
import { selectUserState } from "../../context/user/userSlice";

const HomeComponent: React.FC = () => {
  const { userInfo, userStatus } = useSelector(selectUserState);
  console.log('userInfo', userInfo);

  return (
    <>
      <TopBar />
      {userInfo.kyc_status === "pending" && (
        <KycModal />
      )}
      <Slider />
      <OurGamesComponent />
    </>
  );
};

export default HomeComponent;
