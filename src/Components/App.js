import React from "react";
import { useSelector } from "react-redux";

import Modal from "./Modal";
import Comments from "./Comments";
function App() {
  const sectionSlice = useSelector((state) => state.sectionSlice);

  return (
    <>
      {/* modal & overlay */}
      <Modal
      // to handle appearing and disappearing
        deletingCommentId={sectionSlice.deletingCommentId}
        deletingReplyId={sectionSlice.deletingReplyId}
      />
      <Comments />
    </>
  );
}

export default App;
