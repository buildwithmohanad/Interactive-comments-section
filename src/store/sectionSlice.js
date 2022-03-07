import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchData = createAsyncThunk(
  "comments/fetchData",
  (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = require("../Components/Comments/data.json");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const sectionSlice = createSlice({
  name: "comments",
  initialState: {
    Data: {},
    error: null,
    //comments
    deletingCommentId: null,
    editingCommentId: null,
    replyingToCommentId: null,
    commentScoreChangedTimes: [],

    //replies
    deletingReplyId: null,
    editingReplyId: null,
    replyingToReplyId: null,
    replyScoreChangedTimes: [],
  },
  reducers: {
    fetchLocalData: (state) => {
      let localData = JSON.parse(localStorage.getItem("data"));
      state.Data = localData;
    },
    //comments

    //adding
    addComment: (state, action) => {
      state.Data.comments.push(action.payload);
      localStorage.setItem("data", JSON.stringify(state.Data));
    },

    //deleting
    addDeleteCommentId: (state, action) => {
      state.deletingCommentId = action.payload;
    },
    deleteComment: (state) => {
      state.Data.comments = state.Data.comments.filter(
        (comment) => comment.id !== state.deletingCommentId
      );
      state.deletingCommentId = null;
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    clearDeleteCommentId: (state) => {
      state.deletingCommentId = null;
    },

    //editing
    addEditingCommentId: (state, action) => {
      state.editingCommentId = action.payload;
    },
    editComment: (state, action) => {
      state.Data.comments.map((comment) => {
        if ("commentContent_" + comment.id === state.editingCommentId) {
          comment.content = action.payload;
        }
        return comment;
      });
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    clearEditingCommentId: (state) => {
      state.editingCommentId = null;
    },
    //rating comment
    rateComment: (state, action) => {
      if (
        !state.commentScoreChangedTimes.find(
          (comment) => comment.id === action.payload.commentId
        )
      ) {
        state.commentScoreChangedTimes.push({
          id: action.payload.commentId,
          ChangedTimes: 0,
        });
      }

      let scoreChangedTimes = state.commentScoreChangedTimes.find(
        (comment) => comment.id === action.payload.commentId
      );

      state.Data.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          if (action.payload.actionType === "increase") {
            if (scoreChangedTimes.ChangedTimes !== 1) {
              scoreChangedTimes.ChangedTimes++;
              comment.score++;
            }
          } else {
            if (scoreChangedTimes.ChangedTimes !== -1) {
              scoreChangedTimes.ChangedTimes--;
              comment.score--;
            }
          }
        }
        return comment;
      });
      localStorage.setItem("data", JSON.stringify(state.Data));
    },

    setreplyingToComment: (state, action) => {
      state.replyingToCommentId = action.payload;
    },
    replyToComment: (state, action) => {
      state.Data.comments.map((comment) => {
        if (comment.id === state.replyingToCommentId) {
          comment.replies.unshift(action.payload);
        }
        return comment;
      });
      state.replyingToCommentId = null;
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    //replies

    //adding
    addReplyDeleteId: (state, action) => {
      state.Data.comments.push(action.payload);
    },
    //deleteing
    addDeletingReplyId: (state, action) => {
      state.deletingReplyId = action.payload;
    },
    deleteReply: (state) => {
      state.Data.comments = state.Data.comments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter(
            (Reply) => Reply.id !== state.deletingReplyId
          ),
        };
      });
      state.deletingReplyId = null;
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    clearDeletingReplyId: (state) => {
      state.deletingReplyId = null;
    },

    //editing
    addEditingReplyId: (state, action) => {
      state.editingReplyId = action.payload;
    },
    editReply: (state, action) => {
      state.Data.comments.map((comment) => {
        let replies = comment.replies.map((reply) => {
          if (reply.id === state.editingReplyId) {
            reply.content = action.payload;
          }
          // else {
          //   return reply;
          // }
          return reply;
        });
        return { ...comment, replies };
      });
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    clearEditingReplyId: (state) => {
      state.editingReplyId = null;
    },

    //rating reply
    rateReply: (state, action) => {
      if (
        !state.replyScoreChangedTimes.find(
          (reply) => reply.id === action.payload.replyId
        )
      ) {
        state.replyScoreChangedTimes.push({
          id: action.payload.replyId,
          ChangedTimes: 0,
        });
      }

      let scoreChangedTimes = state.replyScoreChangedTimes.find(
        (reply) => reply.id === action.payload.replyId
      );

      state.Data.comments.map((comment) => {
        return comment.replies.map((reply) => {
          if (reply.id === action.payload.replyId) {
            if (action.payload.actionType === "increase") {
              if (scoreChangedTimes.ChangedTimes !== 1) {
                scoreChangedTimes.ChangedTimes++;
                reply.score++;
              }
            } else {
              if (scoreChangedTimes.ChangedTimes !== -1) {
                scoreChangedTimes.ChangedTimes--;
                reply.score--;
              }
            }
          }
          return reply;
        });
      });
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    setreplyingToReply: (state, action) => {
      state.replyingToReplyId = action.payload;
    },
    replyToReply: (state, action) => {
      state.Data.comments.map((comment) => {
        comment.replies.map((reply) => {
          if (reply.id === state.replyingToReplyId) {
            let replyIndex = comment.replies.indexOf(reply) + 1;
            comment.replies.splice(replyIndex, 0, action.payload);
          }
          return reply;
        });

        return comment;
      });
      localStorage.setItem("data", JSON.stringify(state.Data));

      state.replyingToReplyId = null;
    },
  },

  // featch Data
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.Data = action.payload;
      localStorage.setItem("data", JSON.stringify(state.Data));
    },
    [fetchData.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const {
  //comments
  addComment,
  addDeleteCommentId,
  deleteComment,
  clearDeleteCommentId,
  addEditingCommentId,
  clearEditingCommentId,
  editComment,
  rateComment,
  setreplyingToComment,
  replyToComment,
  //replies
  addDeletingReplyId,
  deleteReply,
  clearDeletingReplyId,
  addEditingReplyId,
  editReply,
  clearEditingReplyId,
  setreplyingToReply,
  replyToReply,
  rateReply,
  fetchLocalData,
} = sectionSlice.actions;
export default sectionSlice.reducer;
