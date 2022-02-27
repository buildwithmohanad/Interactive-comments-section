import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { fetchData } from "../../store/sectionSlice.js";
function Comments() {
  const sectionSlice = useSelector((state) => state.sectionSlice);

  const Dispatch = useDispatch();

  // fetch Data
  useEffect(() => {
    Dispatch(fetchData());
    // Dispatch(anyAction()) this will work 
  }, [Dispatch]);
  return (
    <>
      {sectionSlice.Data.hasOwnProperty("currentUser") &&
      !sectionSlice.error ? (
        <div className="app">
          {sectionSlice.Data.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <AddComment Data={sectionSlice.Data} />
        </div>
      ) : (
        <div
          style={{ display: sectionSlice.error ? "none" : "flex" }}
          className="flex items-center justify-center w-full h-screen"
        >
          <p>Looding ...</p>
        </div>
      )}
      {sectionSlice.error && (
        <div className="flex items-center justify-center w-full h-screen">
          <p>Sorry, there is a problem when fetching comments</p>
        </div>
      )}
    </>
  );
}

export default Comments;
