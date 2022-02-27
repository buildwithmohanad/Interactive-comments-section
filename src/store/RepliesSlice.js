import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RepliesArr: [],
  deleteClicked: false,
  deletedReplyID: null,
  deletedCommentId: null,
  notUpdating: true,
  addedComments: [],
};

export const RepliesSlice = createSlice({
  name: "Replies",
  initialState,
  reducers: {
    addReply: (state, action) => {
      state.RepliesArr.push(action.payload);
    },
    deleteReply: (state, action) => {
      state.RepliesArr.splice(action.payload, 1);
    },
    toggleDeleteClicked: (state) => {
      state.deleteClicked = !state.deleteClicked;
    },
    addReplyDeleteId: (state, action) => {
      state.deletedReplyID = action.payload;
    },
    addCommentDeleteId: (state, action) => {
      state.deletedCommentId = action.payload;
    },
    clearDeletedCommentId: (state) => {
      state.deletedCommentId = [];
    },
    toggleUpdating: (state) => {
      state.notUpdating = !state.notUpdating;
    },
    addComment: (state, action) => {
      state.addedComments.push(action.payload);
    },
    deleteAddedComment: (state, action) => {
      state.addedComments = state.addedComments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    clearAddedComment: (state) => {
      state.addedComments = [];
    },
  },
});

export const {
  addReply,
  deleteReply,
  toggleDeleteClicked,
  addReplyDeleteId,
  clearDeletedCommentId,
  addCommentDeleteId,
  toggleUpdating,
  addComment,
  clearAddedComment,
  deleteAddedComment,
} = RepliesSlice.actions;

export default RepliesSlice.reducer;