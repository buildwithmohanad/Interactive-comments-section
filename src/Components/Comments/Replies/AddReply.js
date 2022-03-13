import React from "react";
import { useDispatch } from "react-redux";
import { replyToComment, replyToReply } from "../../../store/sectionSlice";
import { useMediaQuery } from "react-responsive";
export default function AddReply({ Data, commentUserName, replyUserName }) {
  let content = React.useRef("");
  const Dispatch = useDispatch();
  const IsBigMedia = useMediaQuery({ query: "(min-width: 768px)" });
  const sendHundler = (event) => {
    event.preventDefault();
    let replyingToUserName = commentUserName ? commentUserName : replyUserName;
    let newReply = {
      id: Date.now(),
      content: content.current.value,
      createdAt: "now",
      score: 0,
      replyingTo: replyingToUserName,
      user: {
        image: {
          png: `${Data.currentUser.image.png}`,
          webp: `${Data.currentUser.image.webp}`,
        },
        username: Data.currentUser.username,
      },
    };
    if (commentUserName) {
      Dispatch(replyToComment(newReply));
    } else {
      Dispatch(replyToReply(newReply));
    }
    document.getElementById("add-comment-textarea").value = " ";
  };
  return (
    <div className="add-interaction add-reply">
      {!IsBigMedia && (
        <textarea
          id="add-reply-textarea"
          placeholder="Add a Reply..."
          ref={content}
        ></textarea>
      )}
      <div>
        <picture>
          <source
            srcSet={
              window.location.origin + `/assets/${Data.currentUser.image.webp}`
            }
            alt={Data.currentUser.username + " photo"}
          />
          <img
            src={
              window.location.origin + `/assets/${Data.currentUser.image.png}`
            }
            alt={Data.currentUser.username + " photo"}
          />
        </picture>
        {IsBigMedia && (
          <textarea
            placeholder="Add a Reply..."
            id="add-comment-textarea"
            ref={content}
          ></textarea>
        )}
        <input
          type="submit"
          onClick={sendHundler}
          data-testid="addreply-sendBtn"
          value="Send"
        />
      </div>
    </div>
  );
}
