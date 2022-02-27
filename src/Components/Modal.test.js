import React from "react";
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "./App";
import Modal from "./Modal";

describe("appearing & diseappring when toggling delteingCommentId or deletingReplyId store Prop", () => {
  test("appearing when delteingCommentId have a value", () => {
    render(
      <Provider store={store}>
        <Modal deletingCommentId="1" />
      </Provider>
    );
    let modal = screen.getByTestId(/modal/i);
    let overlay = screen.getByTestId(/overlay/i);

    expect(overlay).toBeInTheDocument();
    expect(modal).toBeInTheDocument();
  });
  test("appearing when delteingReplyId have a value", () => {
    render(
      <Provider store={store}>
        <Modal deletingReplyId="50" />
      </Provider>
    );
    let modal = screen.getByTestId(/modal/i);
    let overlay = screen.getByTestId(/overlay/i);

    expect(overlay).toBeInTheDocument();
    expect(modal).toBeInTheDocument();
  });
  test("disappearing when delteingCommentId & deletingReplyId don't have a value", () => {
    render(
      <Provider store={store}>
        <Modal deletingReplyId={null} deletingCommentId={null} />
      </Provider>
    );
    let modal = screen.queryByTestId(/modal/i);
    let overlay = screen.queryByTestId(/overlay/i);

    expect(overlay).not.toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();
  });
  test("disappearing when cancel button clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // to check that the data have featched
    expect(await screen.findByTestId(/reply_50/i)).toBeInTheDocument();

    // the modal should appear
    const replyDeleteBtn = screen.getByTestId(/reply_delete_Action_51/i);
    replyDeleteBtn.click();

    let cancelBtn = screen.queryByText(/NO, CANCEL/i);
    cancelBtn.click();

    let modal = screen.queryByTestId(/modal/i);
    let overlay = screen.queryByTestId(/overlay/i);

    expect(modal).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  });
});

describe("should delete reply and comment in the props when delete btn clicked", () => {
  test("should delete comment when delete clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // to check that the data have featched
    expect(await screen.findByTestId(/comment_1/i)).toBeInTheDocument();

    // adding comment
    fireEvent.change(screen.getByPlaceholderText(/Add a comment.../i), { target: { value: 'new comment' } })
    screen.getByText(/Send/i).click()

      // deleting
    const commentDeleteBtn = screen.getByTestId(/comment_delete_action_new comment/i);
    commentDeleteBtn.click();
    let ModalDeleteBtn = screen.getByText(/YES, DELETE/i);
    ModalDeleteBtn.click();


    expect(screen.queryByTestId(/comment_delete_action_new comment/i)).not.toBeInTheDocument();
  });
  test("should delete reply when delete clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // to check that the data have featched
    expect(await screen.findByTestId(/reply_50/i)).toBeInTheDocument();
    const replyDeleteBtn = screen.getByTestId(/reply_delete_Action_51/i);
    replyDeleteBtn.click();

    let ModalDeleteBtn = screen.getByText(/YES, DELETE/i);
    ModalDeleteBtn.click();
    const deletedReply = screen.queryByTestId(/reply_51/i);
    expect(deletedReply).not.toBeInTheDocument();
  });
});
