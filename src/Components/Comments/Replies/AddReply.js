import React from "react";
import { useDispatch } from "react-redux";
import { replyToComment, replyToReply} from "../../../store/sectionSlice";
import {useMediaQuery} from "react-responsive"
export default function AddReply({ Data, commentUserName, replyUserName }) {
  let content = React.useRef("");
  const Dispatch = useDispatch();
  const IsBigMedia =useMediaQuery({ query: '(min-width: 768px)' });

  const sendHundler = () => {
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
    if (commentUserName ) {
      Dispatch(replyToComment(newReply));
    } else {
      Dispatch(replyToReply(newReply))
    }
    document.getElementById("add-comment-textarea").value = " ";
  };
  return (
    <div className="add-interaction add-reply">
      {!IsBigMedia && (
        <textarea
          id="add-comment-textarea"
          placeholder="Add a Reply..."
          ref={content}
        ></textarea>
      )}
      <div className="">
        <picture>
          <source
            srcSet={require( /* webpackMode: "eager" */`../assets/${Data.currentUser.image.webp}`).default}
            alt={Data.currentUser.username + " photo"}
          />
          <img
            src={require(/* webpackMode: "eager" */ `../assets/${Data.currentUser.image.png}`).default}
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
        <button onClick={sendHundler}>Send</button>
      </div>
    </div>
  );
}
