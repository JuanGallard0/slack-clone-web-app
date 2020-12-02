import React from "react";
import "./Message.css";

function Message({ message, timestamp, user, userImage, imageUrl }) {
    return (
        <>
            <div className="message">
                <img
                    style={{ display: userImage ? "block" : "none" }}
                    className="message__avatar"
                    src={userImage}
                    alt=""
                />
                <div className="message__info">
                    <h4>
                        {user}{" "}
                        <span
                            style={{ display: timestamp ? "inline" : "none" }}
                            className="message__timestamp"
                        >
                            {new Date(timestamp?.toDate()).toUTCString()}
                        </span>
                    </h4>
                    <p>{message}</p>
                </div>
                <a
                    style={{ display: imageUrl ? "block" : "none" }}
                    className="message__image"
                    href={imageUrl ? imageUrl : null}
                    target="_blank"
                >
                    <img
                        className="message__image"
                        style={{ display: imageUrl ? "block" : "none" }}
                        src={imageUrl}
                        alt={imageUrl}
                    />
                </a>
            </div>
        </>
    );
}

export default Message;
