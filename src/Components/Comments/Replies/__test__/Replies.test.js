import React from "react";
import { render, screen, prettyDOM, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../store";
import App from "../../../App";

describe("upvoting and downvoting reply", () => {
  test("should upvote comment when plus img clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // adding reply
    await screen
      .findByTestId(/reply_reply_action_50/i)
      .then((el) => el.click());
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "testingReply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();

    let replyScoreEl = screen.getByTestId(/replyScore_testingReply/i);
    let replyPlusScoreEl = screen.getByTestId(/reply_score_plus_testingReply/i);

    expect(replyScoreEl.innerHTML).toEqual("0");
    replyPlusScoreEl.click();
    expect(replyScoreEl.innerHTML).toEqual("1");
  });
  test("should downvote comment when minus img clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // adding reply
    await screen
      .findByTestId(/reply_reply_action_50/i)
      .then((el) => el.click());
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "testingReply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();

    let replyScoreEl = screen.getByTestId(/replyScore_testingReply/i);
    let replyMinusScoreEl = screen.getByTestId(
      /reply_score_minus_testingReply/i
    );

    expect(replyScoreEl.innerHTML).toEqual("0");
    replyMinusScoreEl.click();
    expect(replyScoreEl.innerHTML).toEqual("-1");
  });
  test("should upvote comment once when plus img clicked twice", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // adding reply
    await screen
      .findByTestId(/reply_reply_action_50/i)
      .then((el) => el.click());
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "testingReply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();

    let replyScoreEl = screen.getByTestId(/replyScore_testingReply/i);
    let replyPlusScoreEl = screen.getByTestId(/reply_score_plus_testingReply/i);

    expect(replyScoreEl.innerHTML).toEqual("0");
    replyPlusScoreEl.click();
    replyPlusScoreEl.click();
    expect(replyScoreEl.innerHTML).toEqual("1");
  });
  test("should downvote comment once when minus img clicked twice", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // adding reply
    await screen
      .findByTestId(/reply_reply_action_50/i)
      .then((el) => el.click());
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "testingReply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();

    let replyScoreEl = screen.getByTestId(/replyScore_testingReply/i);
    let replyMinusScoreEl = screen.getByTestId(
      /reply_score_minus_testingReply/i
    );

    expect(replyScoreEl.innerHTML).toEqual("0");
    replyMinusScoreEl.click();
    replyMinusScoreEl.click();
    expect(replyScoreEl.innerHTML).toEqual("-1");
  });
});
describe("editing reply", () => {
  test("when edit clicked update btn should appear and paragraph should be contentEditable and vice versa when clicking update element", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // adding reply
    await screen
      .findByTestId(/reply_reply_action_50/i)
      .then((el) => el.click());
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "testingReply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();

    let paragraphElement = screen.getByTestId(/replyContent_testingReply/i);
    let editEl = screen.getByTestId(/reply_edit_action_testingReply/i);
    fireEvent.click(editEl);

    setTimeout(() => {
      expect(editEl).not.toBeInTheDocument();
      expect(paragraphElement.contentEditable).toEqual("true");
      let updateEL = screen.getByText(/UPDATE/i);
      console.log(prettyDOM());
      updateEL.click();
      expect(updateEL).not.toBeInTheDocument();
      expect(editEl).toBeInTheDocument();
      expect(paragraphElement.contentEditable).toEqual("false");
    }, 5000);
  });
  test("should paragraphElement to be changed when editing and update button clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // adding reply
    await screen
      .findByTestId(/reply_reply_action_50/i)
      .then((el) => el.click());
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "testingReply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();

    let paragraphElement = screen.getByTestId(/replyContent_testingReply/i);
    let editEl = screen.getByTestId(/reply_edit_action_testingReply/i);
    fireEvent.click(editEl);
    setTimeout(() => {
      expect(paragraphElement.contentEditable).toEqual("true");
      fireEvent.change(paragraphElement, { target: { value: "edit comment" } });
      screen.getByText(/UPDATE/i).click();
      expect(paragraphElement.innerHTML).toEqual("edit comment");
    }, 5000);
  });
});
