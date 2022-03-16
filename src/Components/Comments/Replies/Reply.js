import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDeletingReplyId,
  addEditingReplyId,
  editReply,
  clearEditingReplyId,
  setreplyingToReply,
  rateReply,
} from "../../../store/sectionSlice";
import { useMediaQuery } from "react-responsive";

import iconPlus from "../assets/images/icon-plus.svg";
import iconMinus from "../assets/images/icon-minus.svg";
import iconReply from "../assets/images/icon-reply.svg";
import iconEdit from "../assets/images/icon-edit.svg";
import iconDelete from "../assets/images/icon-delete.svg";

export default function Reply({ reply }) {
  const { Data, editingReplyId } = useSelector((state) => state.sectionSlice);
  const Dispatch = useDispatch();
  const IsBigMedia = useMediaQuery({ query: "(min-width: 640px)" });
  const EditHundler = (id) => {
    const contentEl = document.getElementById(`replyContent_${id}`);
    contentEl.contentEditable = true;
    contentEl.focus();
    Dispatch(addEditingReplyId(id));
  };
  const updateHundler = (id) => {
    document.getElementById(`replyContent_${id}`).contentEditable = false;
    Dispatch(
      editReply(document.getElementById(`replyContent_${id}`).innerText)
    );
    Dispatch(clearEditingReplyId());
  };

  return (
    <div className="interaction reply" data-testid={`reply_${reply.id}`}>
      <div className="interaction-content-btn">
        <div className="interaction-container">
          {IsBigMedia && (
            <div className="score">
              <img
                src={iconPlus}
                onClick={() =>
                  Dispatch(
                    rateReply({ actionType: "increase", replyId: reply.id })
                  )
                }
                alt="reply_score_plus_icon"
                data-testid={`reply_score_plus_${reply.content}`}
              />
              <p data-testid={`replyScore_${reply.content}`}>{reply.score}</p>
              <img
                src={iconMinus}
                onClick={() =>
                  Dispatch(
                    rateReply({ actionType: "decrease", replyId: reply.id })
                  )
                }
                alt="reply_score_minus_icon"
                data-testid={`reply_score_minus_${reply.content}`}
              />
            </div>
          )}
          <div className="reply-info-div">
            <div className="interaction-info-container">
              <div className="interaction-info">
                <picture>
                  <source
                    srcSet={
                      require(`../assets/${reply.user.image.webp}`)
                    }
                    alt={reply.user.username + " photo"}
                  />
                  <img
                    src={require(`../assets/${reply.user.image.png}`)}
                    alt={reply.user.username + " photo"}
                  />
                </picture>

                <h1 className="interaction-userName ">{reply.user.username}</h1>
                {reply.user.username === Data.currentUser.username && (
                  <span className="youSpan">you</span>
                )}
                <h3 className="interaction-created-time ">{reply.createdAt}</h3>
              </div>

              {IsBigMedia &&
                (reply.user.username === Data.currentUser.username ? (
                  <div className="interaction-actions">
                    <div
                      className="delete-action"
                      onClick={() => Dispatch(addDeletingReplyId(reply.id))}
                      data-testid={`reply_delete_Action_${reply.id}`}
                    >
                      <img src={iconDelete} alt="delete icon" />
                      Delete
                    </div>
                    {editingReplyId !== reply.id && (
                      <div
                        className="edit-action"
                        id="edit-action"
                        data-testid={`reply_edit_action_${reply.content}`}
                        onClick={() => EditHundler(reply.id)}
                      >
                        <img src={iconEdit} alt="edit icon" />
                        Edit
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="reply-action"
                    data-testid={`reply_reply_action_${reply.id}`}
                    onClick={() => Dispatch(setreplyingToReply(reply.id))}
                  >
                    <img src={iconReply} alt="reply icon" />
                    Reply
                  </div>
                ))}
            </div>

            <p
              suppressContentEditableWarning={true}
              className="interaction-content"
              data-testid={`replyContent_${reply.content}`}
              id={`replyContent_${reply.id}`}
            >
              {
                <span
                  suppressContentEditableWarning={true}
                  contentEditable="false"
                >
                  {"@" + reply.replyingTo}
                </span>
              }
              {reply.content}
            </p>
          </div>

          {!IsBigMedia && (
            <div className="interaction-actions">
              <div className="score">
                <img
                  src={iconPlus}
                  onClick={() =>
                    Dispatch(
                      rateReply({ actionType: "increase", replyId: reply.id })
                    )
                  }
                  alt="reply_score_plus_icon"
                  data-testid={`reply_score_plus_${reply.content}`}
                />
                <p id="replyScore" data-testid={`replyScore_${reply.content}`}>
                  {reply.score}
                </p>
                <img
                  src={iconMinus}
                  onClick={() =>
                    Dispatch(
                      rateReply({ actionType: "decrease", replyId: reply.id })
                    )
                  }
                  alt="reply_score_minus_icon"
                  data-testid={`reply_score_minus_${reply.content}`}
                />
              </div>
              {reply.user.username === Data.currentUser.username ? (
                <div className="interaction-actions">
                  <div
                    className="delete-action"
                    data-testid={`reply_delete_Action_${reply.id}`}
                    onClick={() => Dispatch(addDeletingReplyId(reply.id))}
                  >
                    <img src={iconDelete} alt="delete icon" />
                    Delete
                  </div>
                  {editingReplyId === reply.id && IsBigMedia && (
                    <button
                      onClick={() => updateHundler(reply.id)}
                      className="update-btn"
                    >
                      UPDATE
                    </button>
                  )}
                  {editingReplyId !== reply.id && (
                    <div
                      className="edit-action"
                      id="edit-action"
                      data-testid={`reply_edit_action_${reply.content}`}
                      onClick={() => EditHundler(reply.id)}
                    >
                      <img src={iconEdit} alt="edit icon" />
                      Edit
                    </div>
                  )}
                </div>
              ) : (
                <div className="interaction-actions">
                  <div
                    className="reply-action"
                    data-testid={`reply_reply_action_${reply.id}`}
                    onClick={() => Dispatch(setreplyingToReply(reply.id))}
                  >
                    <img src={iconReply} alt="reply icon" />
                    Reply
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {editingReplyId === reply.id &&
          reply.user.username === Data.currentUser.username &&
          IsBigMedia && (
            <button
              onClick={() => updateHundler(reply.id)}
              className="update-btn"
            >
              UPDATE
            </button>
          )}
      </div>
    </div>
  );
}
