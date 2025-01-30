import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./kycModal.scss";
import { useNavigate } from "react-router-dom";

const KycModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVerification = () => {
    navigate('/kyc');
  };

  return (
    <>
      <div className="kyc_bar">
        <p>KYC required to access all features</p>
        <Button onClick={showModal}>Tap Here</Button>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        className="kyc_modal"
        centered
        width={{
          xs: "98%",
          sm: "90%",
          md: "500px",
        }}
      >
        <div className="kyc_content">
          <div className="kyc_icon">
            <img src="./images/newimg/profile1.svg" alt="KYC Icon" />
          </div>
          <h2 className="kyc_title">KYC Verification</h2>
          <p className="kyc_description">
            To ensure the security of your account and comply with regulatory
            requirements, we need to verify your identity.{" "}
            <strong>You will be done in 5 mins!</strong>
          </p>
          <div className="primary_btn_bg">
            <Button className="primary_btn kyc_start_btn" onClick={handleVerification}>
              Start Verification
            </Button>
          </div>
          <Button key="back" className="kyc_skip" onClick={handleCancel}>
            Skip for later
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default KycModal;
