import React from 'react';

export const MDContainer = (props) => {
  return (
    <div className="mx-auto max-w-screen-md">{props.children}</div>
  );
}

