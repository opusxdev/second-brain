import React from "react";

const Tags = (props) => {
  return (
    <div className="px-3 py-1 text-lg bg-blue-100 rounded-2xl text-blue-500">
      #{props.tagTypes}
    </div>
  );
};

export default Tags;
