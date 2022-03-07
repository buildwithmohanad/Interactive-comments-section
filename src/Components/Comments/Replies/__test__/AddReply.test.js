import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../store";
import App from "../../../App";

describe("repling to comment", () => {
  test("should addReply component appear when reply element clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let reply = await screen
      .findAllByText(/reply/i)
      .then((arr) => arr[arr.length - 1]);

    reply.click();
    expect(screen.getByPlaceholderText(/Add a Reply.../i)).toBeInTheDocument();
  });
  test("should comment be replied when sendBtn clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let reply = await screen
      .findAllByText(/reply/i)
      .then((arr) => arr[arr.length - 1]);
    reply.click();
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "blabla" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();
    expect(screen.getByTestId(/replyScore_blabla/i)).toBeInTheDocument();
  });
});
describe("repling to reply", () => {
  test("should addReply component appear when reply element in reply clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let replyEL = await screen.findByTestId(/reply_reply_action_50/i);

    replyEL.click();
    expect(screen.getByPlaceholderText(/Add a Reply.../i)).toBeInTheDocument();
  });
  test("should reply be replied to when send btn clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let replyEL = await screen.findByTestId(/reply_reply_action_50/i);

    replyEL.click();
    fireEvent.change(screen.getByPlaceholderText(/Add a Reply.../i), {
      target: { value: "this is a reply to reply" },
    });
    screen.getByTestId(/addreply-sendBtn/i).click();
    expect(
      screen.getByTestId(/replyScore_this is a reply to reply/i)
    ).toBeInTheDocument();
  });
});