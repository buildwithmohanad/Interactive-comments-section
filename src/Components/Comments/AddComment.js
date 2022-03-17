import React from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/sectionSlice";
import { useMediaQuery } from "react-responsive";
export default function AddComment({ Data }) {
  let content = React.useRef("");
  const Dispatch = useDispatch();
  const IsBigMedia = useMediaQuery({ query: "(min-width: 768px)" });
  const sendHundler = (event) => {
    event.preventDefault();

    let newComment = {
      id: Date.now(),
      content: content.current.value,
      createdAt: "now",
      score: 0,
      replyingTo: Data.currentUser.username,
      user: {
        image: {
          png: `${Data.currentUser.image.png}`,
          webp: `${Data.currentUser.image.webp}`,
        },
        username: Data.currentUser.username,
      },
      replies: [],
    };
    Dispatch(addComment(newComment));
    document.getElementById("add-comment-textarea").value = " ";
  };
  return (
    <div className=" add-interaction">
      <form>
        {!IsBigMedia && (
          <textarea
            id="add-comment-textarea"
            placeholder="Add a comment..."
            ref={content}
          ></textarea>
        )}
        <div>
          <picture>
            <source
              srcSet={
                window.location.origin +
                `/assets/${Data.currentUser.image.webp}`
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
              placeholder="Add a comment..."
              id="add-comment-textarea"
              ref={content}
            ></textarea>
          )}
          <input type="submit" onClick={sendHundler} value="send" />
        </div>
      </form>
    </div>
  );
}
