import React from "react";
import { useDispatch } from "react-redux";
import {
  clearDeleteCommentId,
  deleteComment,
  clearDeletingReplyId,
  deleteReply,
} from "../store/sectionSlice";

export default function Modal({ deletingCommentId, deletingReplyId }) {
  // const sectionSlice = useSelector((state) => state.sectionSlice);
  const Dispatch = useDispatch();

  const DeleteHundler = () => {
    if (deletingCommentId) {
      Dispatch(deleteComment());
    } else {
      Dispatch(deleteReply());
    }
  };
  // "test": "react-scripts test",
  const showModal = deletingCommentId || deletingReplyId;
  return (
    <>
      {showModal && (
        <>
          <div
            className="overlay"
            data-testid="overlay"
            onClick={() => {
              Dispatch(clearDeleteCommentId());
              Dispatch(clearDeletingReplyId());
            }}
          ></div>
          <div className="modal" data-testid="modal">
            <h2>Delete comment</h2>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone
            </p>
            <div className="delete-btns-container">
              <button
                className="delete-cancel-button"
                onClick={() => {
                  Dispatch(clearDeleteCommentId());
                  Dispatch(clearDeletingReplyId());
                }}
              >
                NO, CANCEL
              </button>
              <button onClick={DeleteHundler}>YES, DELETE</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
