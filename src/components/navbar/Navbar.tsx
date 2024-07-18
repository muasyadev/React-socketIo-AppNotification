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
}

const Navbar = ({ socket }: NavbarProps) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

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

  return (
    <div className="navbar">
      <span className="logo">Logo</span>
      <div className="icons">
        <div className="icon">
          <img src={Notification} className="iconImg" alt="" />
          <div className="counter">{notifications.length}</div>
        </div>
        <div className="icon">
          <img src={Message} className="iconImg" alt="" />
          <div className="counter">2</div> {/* Example counter */}
        </div>
        <div className="icon">
          <img src={Settings} className="iconImg" alt="" />
          <div className="counter">2</div> {/* Example counter */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
