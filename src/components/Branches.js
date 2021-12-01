import React from "react";

function Branches(props) {
  let i = props.index;
  const branches =
    props.repoList.length > 0 ? props.repoList[i].branches : null;

  return (
    <>
      {branches !== null ? (
        branches.map(branch => (
          <div className="border py-1 px-1 my-2">{branch.name}</div>
        ))
      ) : (
        <div className="border py-1 px-1 my-2">null</div>
      )}
    </>
  );
}

export default Branches;
