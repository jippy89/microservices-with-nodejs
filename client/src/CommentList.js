import React, { useState, useEffect } from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content

    switch (comment.status) {
      case 'approved':
        content = comment.content
        break
      case 'rejected':
        content = 'This content is rejected'
        break
      case 'pending':
        content = 'This content is being moderated'
      default:
        break
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
