import "./card.css";
import Heart from "../img/heart.svg";
import Share from "../img/share.svg";
import Info from "../img/info.svg";
import Comment from "../img/comment.svg";
import HeartFilled from "../img/heartFilled.svg";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface Post {
  username: string;
  userImg: string;
  fullName: string;
  postImg: string;
}

interface CardProps {
  post: Post;
  Socket: Socket | null;
  user: string;
}

const Card = ({ post, Socket, user }: CardProps) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type: number) => {
    setLiked(true);
    if (Socket) {
      Socket.emit("sendNotification", {
        senderName: user,
        receiverName: post.username,
        type,
      });
    }
  };
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullName}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interactions">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}

        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img
          src={Info}
          alt=""
          className="cardIcon infoIcon"
          onClick={() => handleNotification(4)}
        />
      </div>
    </div>
  );
};

export default Card;
