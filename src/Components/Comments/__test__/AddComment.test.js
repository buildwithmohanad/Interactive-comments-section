import React from "react";
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import App from "../../App";

  test("should add comment with the value of the textarea", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    let sendBtn = await screen.findByText(/Send/i);

    let textArea = screen.getByPlaceholderText(/Add a comment.../i);
    fireEvent.change(textArea, { target: { value: 'bla bla bla' } })

    sendBtn.click()
    expect(screen.getByText(/bla bla bla/i)).toBeInTheDocument();
  });
