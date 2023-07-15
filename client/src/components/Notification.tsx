import React from "react";
import "./Notification.css";
import { NotificationContext } from "../App";

export const Notification = () => {
  const {
    notification: { type, message } = {
      type: "success",
      message: "Successfully",
    },
    toggleNotification,
  } = React.useContext(NotificationContext);

  const handleCloseNotification = () => {
    toggleNotification(undefined);
  };

  React.useEffect(() => {
    setTimeout(() => {
      toggleNotification(undefined);
    }, 5000);
  });

  return (
    <div className={`popup ${type}`}>
      <div className="popup-content">
        <div className="popup-message">{message}</div>
        <button className="close-button" onClick={handleCloseNotification}>
          Close
        </button>
      </div>
    </div>
  );
};
