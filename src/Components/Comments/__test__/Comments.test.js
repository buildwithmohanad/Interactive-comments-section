import React from "react";
import {
  render,
  screen,
  fireEvent,
  prettyDOM,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import App from "../../App";

describe("editing comment", () => {
  test("when edit clicked update btn should appear and paragraph should be contentEditable and vice versa when clicking update element", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // add comment
    fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
      target: { value: "blablabla" },
    });
    screen.getByText(/Send/i).click();

    let paragraphElement = screen.getByTestId(/commentContent_blablabla/i);
    let editEl = screen.getByTestId(/comment_edit_action_blablabla/i);
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
    fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
      target: { value: "blablabla" },
    });
    screen.getByText(/Send/i).click();

    let paragraphElement = screen.getByTestId(/commentContent_blablabla/i);
    let editEl = screen.getByTestId(/comment_edit_action_blablabla/i);
    fireEvent.click(editEl);
    setTimeout(() => {
      expect(paragraphElement.contentEditable).toEqual("true");
      fireEvent.change(paragraphElement, { target: { value: "edit comment" } });
      screen.getByText(/UPDATE/i).click();
      expect(paragraphElement.innerHTML).toEqual("edit comment");
    }, 5000);
  });
});
describe("upvote and downvote comment", () => {
  test("should upvote comment when plus img clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // add comment
    fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
      target: { value: "blablabla" },
    });
    screen.getByText(/Send/i).click();

    let commentScoreElement = screen.getByTestId(/commentScore_blablabla/i);
    expect(commentScoreElement.innerHTML).toEqual("0");
    let plusIcon = await screen
      .findAllByAltText(/score plus icon/i)
      .then((arr) => arr[arr.length - 1]);
    plusIcon.click();
    expect(commentScoreElement.innerHTML).toEqual("1");
  });
  test("should downvote comment when minus img clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // add comment
    fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
      target: { value: "blablabla" },
    });
    screen.getByText(/Send/i).click();
    let commentScoreElement = screen.getByTestId(/commentScore_blablabla/i);
    expect(commentScoreElement.innerHTML).toEqual("0");
    let minusIcon = await screen
      .findAllByAltText(/score minus icon/i)
      .then((arr) => arr[arr.length - 1]);
    minusIcon.click();
    expect(commentScoreElement.innerHTML).toEqual("-1");
  });
  test("should upvote comment once when plus img clicked twice", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // add comment
    fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
      target: { value: "blablabla" },
    });
    screen.getByText(/Send/i).click();
    let commentScoreElement = screen.getByTestId(/commentScore_blablabla/i);
    expect(commentScoreElement.innerHTML).toEqual("0");
    let plusIcon = await screen
      .findAllByAltText(/score plus icon/i)
      .then((arr) => arr[arr.length - 1]);
    plusIcon.click();
    plusIcon.click();
    expect(commentScoreElement.innerHTML).toEqual("1");
  });
  test("should downvote comment once when minus img clicked twice", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // add comment
    fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
      target: { value: "blablabla" },
    });
    screen.getByText(/Send/i).click();

    let commentScoreElement = screen.getByTestId(/commentScore_blablabla/i);
    expect(commentScoreElement.innerHTML).toEqual("0");
    let minusIcon = await screen
      .findAllByAltText(/score minus icon/i)
      .then((arr) => arr[arr.length - 1]);
    minusIcon.click();
    minusIcon.click();
    expect(commentScoreElement.innerHTML).toEqual("-1");
  });
});

