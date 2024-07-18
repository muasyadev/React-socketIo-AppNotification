import "./navbar.css";
import Notification from "../img/notification.svg";
import Message from "../img/message.svg";
import Settings from "../img/settings.svg";

import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

interface NavbarProps {
  socket: Socket | null;
}

interface NotificationData {
  id: string;
  message: string;
  senderName: string;
  type: number;
}

const Navbar = ({ socket }: NavbarProps) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data: NotificationData) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
    return () => {
      socket?.off("getNotification");
    };
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }: NotificationData) => {
    let action;
    if (type === 1) {
      action = "Liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };
  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Logo</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((notification, index) => (
            <>
              <div key={index}>{displayNotification(notification)}</div>
              <button className="nButton" onClick={handleRead}>
                Mark as read
              </button>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
