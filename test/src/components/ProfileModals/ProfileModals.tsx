import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Flex } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ProfileModals: React.FC<{
  showProfileUpdated?: boolean;
  visibleModal?: string | null;
  closeModal: () => void;
}> = ({ showProfileUpdated, visibleModal, closeModal }) => {
  const [isModalProfileVisible, setIsModalProfileVisible] =
    useState(showProfileUpdated);
  const { t } = useTranslation();

  const Text = Typography;

  useEffect(() => {
    if (showProfileUpdated) {
      setIsModalProfileVisible(true); // Open modal if showProfileUpdated is true
    }
  }, [showProfileUpdated]);

  const closeModalProfile = () => {
    setIsModalProfileVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Modal
        className="grey_gradint_bg"
        open={isModalProfileVisible}
        onCancel={closeModalProfile}
        centered
        closeIcon={null}
        width={{
          xs: "98%",
          sm: "90%",
          md: "475px",
        }}
        footer={null}
      >
        <div className="modal_bg " >
          <div className='modal_bg_inner'>
            <div style={{ textAlign: "center" }}>
              <img style={{ width: "70px", marginBottom: "15px" }} src="./images/newimg/greencheck.svg" alt="" />
              {/* <CheckCircleOutlined style={{ fontSize: "48px", color: "green" }} /> */}
              <Text style={{ fontSize: "22px", fontWeight: "600", color: "#fff" }}> Profile Updated</Text>
              <Text style={{ fontSize: "14px", color: "#fff", fontWeight: "500", marginBottom: "16px" }}>Your Profile has been updated successfully!</Text>
            </div>
            <div className="primary_btn_bg">
              <Button key="okay" className="primary_btn" onClick={closeModalProfile}>
                Okay
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        open={visibleModal === "deleteAccount"}
        onCancel={closeModal}
        centered
        closeIcon={null}
        className="grey_gradint_bg"
        width={{
          xs: "98%",
          sm: "90%",
          md: "475px",
        }}
        footer={null}
      >
        <div className="modal_bg " >
          <div className='modal_bg_inner'>
            <div style={{ textAlign: "center" }}>
              <img style={{ width: "70px", marginBottom: "15px" }} src="./images/newimg/delete.svg" alt="delete.svg" />
              {/* <DeleteOutlined style={{ fontSize: "48px", color: "red" }} /> */}
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: "22px" }}>{t("Delete Account")}</Text>
              <Text style={{ color: "#fff", fontWeight: "500", marginBottom: "16px" }}>
                {t(
                  "Please withdraw your pending amount from your wallet before deleting your account."
                )}
              </Text>


            </div>
            <Flex style={{ justifyContent: "center", gap: "20px" }}>
              <div style={{
                display: "flex", borderRadius: "8px",
                padding: "1px",
                background: "linear-gradient(111.27deg, #646464 9.26%, rgba(38, 40, 67, 0) 37%, rgba(17, 18, 30, 0) 50.62%, rgba(130, 145, 177, 0.32) 85.15%)"
              }}>

                <Button key="cancel" style={{
                  width: "132px",
                  height: "41px",
                  fontWeight: "500",
                  border: "none",
                  color: "#000",
                  background: "rgba(97, 102, 112, 1)",
                }} onClick={closeModal}>
                  {t('Cancel')}
                </Button>
              </div >
              <div style={{
                display: "flex", borderRadius: "8px",
                padding: "1px",
                background: "linear-gradient(90deg, #F41D1D 0%, #C11212 100%)"
              }}>

                <Button key="delete" style={{
                  width: "132px",
                  fontWeight: "500",
                  height: "41px",
                  border: "none",
                  color: "#000",
                  background: "linear-gradient(90deg, #F41D1D 0%, #C11212 100%)",
                }} onClick={closeModal}>
                  {t('Delete')}
                </Button>
              </div>

            </Flex>

          </div>
        </div>

      </Modal>

      {/* Logout Account Modal */}
      <Modal
        className="grey_gradint_bg"
        open={visibleModal === "logoutAccount"}
        onCancel={closeModal}
        centered
        width={{
          xs: "98%",
          sm: "90%",
          md: "475px",
        }}
        closeIcon={null}
        footer={null}
      >
        <div className="modal_bg " >
          <div className='modal_bg_inner'>
            <div style={{ textAlign: "center" }}>
              <img style={{ width: "70px", marginBottom: "15px" }} src="./images/newimg/power.svg" alt="delete.svg" />
              {/* <PoweroffOutlined style={{ fontSize: "48px", color: "red" }} /> */}
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: "22px" }}>{t('Logout Account')}</Text>
              <Text style={{ color: "#fff", fontWeight: "500", marginBottom: "16px" }}>
                {t('Are you sure you want to log out?')}
              </Text>
            </div>

            <Flex style={{ justifyContent: "center", gap: "20px" }}>
              <div style={{
                display: "flex", borderRadius: "8px",
                padding: "1px",
                background: "linear-gradient(111.27deg, #646464 9.26%, rgba(38, 40, 67, 0) 37%, rgba(17, 18, 30, 0) 50.62%, rgba(130, 145, 177, 0.32) 85.15%)"
              }}>

                <Button key="cancel" style={{
                  width: "132px",
                  height: "41px",
                  fontWeight: "500",
                  border: "none",
                  color: "#000",
                  background: "rgba(97, 102, 112, 1)",
                }} onClick={closeModal}>
                  {t('Cancel')}
                </Button>
              </div >
              <div style={{
                display: "flex", borderRadius: "8px",
                padding: "1px",
                background: "linear-gradient(90deg, #F41D1D 0%, #C11212 100%)"
              }}>

                <Button key="logout" style={{
                  width: "132px",
                  fontWeight: "500",
                  height: "41px",
                  border: "none",
                  color: "#000",
                  background: "linear-gradient(90deg, #F41D1D 0%, #C11212 100%)",
                }} onClick={closeModal}>
                  {t('Yes, Logout!')}
                </Button>
              </div>

            </Flex>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModals;
