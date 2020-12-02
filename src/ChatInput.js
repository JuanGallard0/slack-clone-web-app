import React, { useState } from "react";
import "./ChatInput.css";
import db from "./firebase";
import { storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId) {
            if (image) {
                handleUpload();
            } else {
                db.collection("rooms")
                    .doc(channelId)
                    .collection("messages")
                    .add({
                        message: input,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        user: user.displayName,
                        userImage: user.photoURL,
                        imageUrl: null,
                    });
            }
        }
        setInput("");
        setProgress(0);
        setImage(null);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("rooms")
                            .doc(channelId)
                            .collection("messages")
                            .add({
                                message: input,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                user: user.displayName,
                                userImage: user.photoURL,
                                imageUrl: url,
                            });
                        db.collection("rooms")
                            .doc("Files")
                            .collection("messages")
                            .add({
                                message: image.name,
                                timestamp: null,
                                user: user.displayName,
                                userImage: null,
                                imageUrl: url,
                            });
                    });
            }
        );
    };

    return (
        <div className="chatInput">
            <form>
                <input
                    className="chatInput__text"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}
                />
                <input
                    className="chatInput__file"
                    type="file"
                    onChange={handleChange}
                />
                <progress
                    className="chatInput__progress"
                    value={progress}
                    max="100"
                />
                <button type="submit" onClick={sendMessage}>
                    SEND
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
