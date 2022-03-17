import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Data from "./data.json";

import {
  addDeleteCommentId,
  addEditingCommentId,
  clearEditingCommentId,
  editComment,
  rateComment,
  setreplyingToComment,
} from "../../store/sectionSlice";
import AddReply from "./Replies/AddReply";
import Reply from "./Replies/Reply";
import iconPlus from "./assets/images/icon-plus.svg";
import iconMinus from "./assets/images/icon-minus.svg";
import iconReply from "./assets/images/icon-reply.svg";
import iconEdit from "./assets/images/icon-edit.svg";
import iconDelete from "./assets/images/icon-delete.svg";
import { useMediaQuery } from "react-responsive";

const Comment = ({ comment }) => {
  const Dispatch = useDispatch();
  const sectionSlice = useSelector((state) => state.sectionSlice);
  const IsBigMedia = useMediaQuery({ query: "(min-width: 640px)" });
  let contentEl;
  const EditHundler = (id) => {
    contentEl = document.getElementById(id);
    contentEl.contentEditable = "true";
    contentEl.focus();
    Dispatch(addEditingCommentId(id));
  };
  const updateHundler = (id) => {
    document.getElementById(`commentContent_${id}`).contentEditable = false;
    Dispatch(
      editComment(document.getElementById(`commentContent_${id}`).innerText)
    );
    Dispatch(clearEditingCommentId());
  };
  let addReplyId = 500;
  return (
    <div className="comment interaction" data-testid={`comment_${comment.id}`}>
      <div className="interaction-content-btn">
        <div className="interaction-container">
          {IsBigMedia && (
            <div className="score">
              <img
                src={iconPlus}
                onClick={() =>
                  Dispatch(
                    rateComment({
                      actionType: "increase",
                      commentId: comment.id,
                    })
                  )
                }
                alt="score plus icon"
              />
              <p
                id={`commentScore_${comment.id}`}
                data-testid={`commentScore_${comment.content}`}
              >
                {comment.score}
              </p>
              <img
                src={iconMinus}
                onClick={() =>
                  Dispatch(
                    rateComment({
                      actionType: "decrease",
                      commentId: comment.id,
                    })
                  )
                }
                alt="score minus icon"
              />
            </div>
          )}
          <div className="interaction-info-div">
            <div className="interaction-info-container">
              <div className="interaction-info">
                <picture>
                  <source
                    srcSet={
                      window.location.origin +
                      `/assets/${comment.user.image.png}`
                    }
                    alt={comment.user.username + " photo"}
                  />
                  <img
                    src={
                      window.location.origin +
                      `/assets/${comment.user.image.png}`
                    }
                    alt={comment.user.username + " photo"}
                  />
                </picture>

                <h1 className="interaction-userName ">
                  {comment.user.username}
                </h1>
                {comment.user.username === Data.currentUser.username && (
                  <span className="youSpan">you</span>
                )}
                <h3 className="interaction-created-time">
                  {comment.createdAt}
                </h3>
              </div>

              {IsBigMedia &&
                (comment.user.username === Data.currentUser.username ? (
                  <div className="interaction-actions">
                    <div
                      className="delete-action"
                      data-testid={`comment_delete_action_${comment.content}`}
                      onClick={() => Dispatch(addDeleteCommentId(comment.id))}
                    >
                      <img src={iconDelete} alt="delete icon" />
                      Delete
                    </div>
                    {sectionSlice.editingCommentId !==
                      `commentContent_${comment.id}` && (
                      <div
                        className="edit-action"
                        id="edit-action"
                        data-testid={`comment_edit_action_${comment.content}`}
                        onClick={() =>
                          EditHundler(`commentContent_${comment.id}`)
                        }
                      >
                        <img src={iconEdit} alt="edit icon" />
                        Edit
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="reply-action"
                    onClick={() => Dispatch(setreplyingToComment(comment.id))}
                  >
                    <img src={iconReply} alt="reply icon" />
                    Reply
                  </div>
                ))}
            </div>

            <p
              suppressContentEditableWarning={true}
              className={
                sectionSlice.editingCommentId !== comment.id &&
                "interaction-content"
              }
              data-testid={`commentContent_${comment.content}`}
              id={`commentContent_${comment.id}`}
            >
              {comment.content}
            </p>
          </div>
          {!IsBigMedia && (
            <div className="interaction-actions">
              <div className="score">
                <img
                  src={iconPlus}
                  onClick={() =>
                    Dispatch(
                      rateComment({
                        actionType: "increase",
                        commentId: comment.id,
                      })
                    )
                  }
                  alt="score plus icon"
                />
                <p
                  id="commentScore"
                  data-testid={`commentScore_${comment.content}`}
                >
                  {comment.score}
                </p>
                <img
                  src={iconMinus}
                  onClick={() =>
                    Dispatch(
                      rateComment({
                        actionType: "decrease",
                        commentId: comment.id,
                      })
                    )
                  }
                  alt="score minus icon"
                />
              </div>
              {comment.user.username === Data.currentUser.username ? (
                <div className="interaction-actions">
                  <div
                    className="delete-action"
                    data-testid={`comment_delete_action_${comment.content}`}
                    onClick={() => Dispatch(addDeleteCommentId(comment.id))}
                  >
                    <img src={iconDelete} alt="delete icon" />
                    Delete
                  </div>
                  {sectionSlice.editingCommentId === comment.id && IsBigMedia && (
                    <button
                      onClick={() => updateHundler(comment.id)}
                      className="update-btn"
                    >
                      UPDATE
                    </button>
                  )}
                  {sectionSlice.editingCommentId !== comment.id && (
                    <div
                      className="edit-action"
                      id="edit-action"
                      data-testid={`comment_edit_action_${comment.content}`}
                      onClick={() =>
                        EditHundler(`commentContent_${comment.id}`)
                      }
                    >
                      <img src={iconEdit} alt="edit icon" />
                      Edit
                    </div>
                  )}
                </div>
              ) : (
                <div className="reply-actions">
                  <div
                    className="reply-action"
                    onClick={() => Dispatch(setreplyingToComment(comment.id))}
                  >
                    <img src={iconReply} alt="reply icon" />
                    Reply
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {sectionSlice.editingCommentId === `commentContent_${comment.id}` &&
          comment.user.username === Data.currentUser.username &&
          IsBigMedia && (
            <button
              onClick={() => updateHundler(comment.id)}
              className="update-btn"
            >
              UPDATE
            </button>
          )}
      </div>
      {comment.id === sectionSlice.replyingToCommentId && (
        <AddReply
          Data={sectionSlice.Data}
          commentUserName={comment.user.username + " "}
        />
      )}
      {/* Replies */}
      {comment.replies.length !== 0 && (
        <div className="replies">
          <div className="replies-container">
            {comment.replies.map((reply) => {
              if (reply.id === sectionSlice.replyingToReplyId) {
                return (
                  <>
                    <Reply key={reply.id} reply={reply} />
                    <AddReply
                      key={addReplyId++}
                      Data={sectionSlice.Data}
                      replyUserName={reply.user.username + " "}
                    />
                  </>
                );
              } else {
                return <Reply key={reply.id} reply={reply} />;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Comment;
