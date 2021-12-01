import React from "react";

export default function Issues(props) {
  let i = props.index;
  const issues = props.repoList.length > 0 ? props.repoList[i].issues : null;

  return (
    <>
      {issues !== null ? (
        issues.map(issue => (
          <div className="border py-1 px-1 my-2">{issue.title}</div>
        ))
      ) : (
        <div className="border py-1 px-1 my-2">null</div>
      )}
    </>
  );
}
