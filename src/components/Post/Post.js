import React from 'react';

import './Post.scss';

const className = 'Post';

const Post = ({ content }) => {
  const printDate = () => {
    return content.created_time.toLocaleString('en-US', {
      dateStyle: "long",
      timeStyle: "medium"
    })
  }

  return (
    <div className={`${className}`}>
      <div>{printDate()}</div>
      <div>{content.message}</div>
    </div>
  );
}

export default Post;