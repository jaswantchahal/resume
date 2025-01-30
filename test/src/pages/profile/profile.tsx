import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyProfileComponent from "../../components/MyProfile/MyProfile";
import ProfileModals from "../../components/ProfileModals/ProfileModals";

const ProfileComponent: React.FC = () => {
  const location = useLocation();
  const showProfileUpdatedModal = location.state?.showProfileUpdatedModal || false;

  // Manage modal visibility centrally
  const [activeModal, setActiveModal] = useState<string | null>(
    showProfileUpdatedModal ? "profileUpdated" : null
  );

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Pass control functions to MyProfileComponent */}
      <MyProfileComponent setActiveModal={setActiveModal} />
      
      {/* Handle modals dynamically */}
      <ProfileModals
        showProfileUpdated={activeModal === "profileUpdated"}
        visibleModal={activeModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default ProfileComponent;
