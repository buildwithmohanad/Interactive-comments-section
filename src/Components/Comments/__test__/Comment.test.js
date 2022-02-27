// import React from "react";
// import { render, screen, prettyDOM, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store } from "../../../store";
// import App from "../../App";

// describe("editing comment", () => {
//   test("update btn should appear and disapear", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
//     // let sendBtn = await screen.findByText(/Send/i);
//     // add comment
//     fireEvent.change(await screen.findByPlaceholderText(/Add a comment.../i), {
//       target: { value: "bla bla bla" },
//     });
//     screen.getByText(/Send/i).click();
//     let editElement = screen.getByTestId(/comment_edit_action_bla bla bla/i);
//     editElement.click();
//     expect(screen.getByText(/update/i)).toBeInTheDocument();
//   });
// });
// // describe("rating comment", () => {
// //   test("sdf", () => {});
// // });
