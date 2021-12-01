import React from "react";
import { Card } from "react-bootstrap";

function RepoList(props) {
  return (
    <>
      <h1>Repo List</h1>
      {props.repoList.map((repo, index) => (
        <Card
          key={index}
          style={{ marginBottom: "15px" }}
          onClick={() => {
            props.IndexClicked(index);
          }}
        >
          <Card.Body>
            <Card.Title>{repo.repo.name}</Card.Title>
            <Card.Text>
              {repo.repo.description != null
                ? repo.repo.description
                : "No description found"}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default RepoList;
