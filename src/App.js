import React, { useState } from "react";
import Header from "./components/Header";
import { Octokit } from "octokit";
import { Button } from "react-bootstrap";
import ModalForm from "./components/ModalForm";
import RepoList from "./components/RepoList";
import Branches from "./components/Branches";
import Issues from "./components/Issues";

function App() {
  const [repoList, setRepoList] = useState([]);
  const [issueIsClicked, setIssueIsClicked] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(0);

  async function fetchRepoInfo(owner = "ShoebMerchant", repo = "DS") {
    const octokit = new Octokit();
    const repoInfo = await octokit
      .request("GET /repos/{owner}/{repo}", {
        owner,
        repo,
      })
      .catch(e => console.error(e));

    const branches = await octokit
      .request("GET /repos/{owner}/{repo}/branches", {
        owner,
        repo,
      })
      .catch(e => console.error(e));

    const issues = await octokit
      .request("GET /repos/{owner}/{repo}/issues", {
        owner,
        repo,
      })
      .catch(e => console.error(e));

    setRepoList([
      ...repoList,
      {
        repo: repoInfo.data,
        branches: branches.data,
        issues: issues.data,
      },
    ]);
  }

  function setRepoIndexSelected(index) {
    setSelectedRepo(index);
  }

  function handleRepDelete() {
    setRepoList(prevVal => {
      return prevVal.filter((el, index) => index !== selectedRepo);
    });
  }

  return (
    <div className="">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-3 me-3 mt-3 border">
            <RepoList repoList={repoList} IndexClicked={setRepoIndexSelected} />
            <ModalForm setRepoInfo={fetchRepoInfo} />
          </div>
          <div className="col-8 mt-3 border">
            {repoList.length !== 0 && (
              <Button
                variant="danger my-3"
                style={{ marginLeft: "87%" }}
                onClick={handleRepDelete}
              >
                Delete
              </Button>
            )}
            <div className="row">
              <div className="col-7 mx-2 my-2">
                <Button
                  variant="secondary my-2"
                  onClick={() => setIssueIsClicked(false)}
                >
                  Branches
                </Button>
                <Button
                  variant="warning my-2 mx-2"
                  onClick={() => setIssueIsClicked(true)}
                >
                  Issues
                </Button>
              </div>
            </div>
            {issueIsClicked ? (
              <Issues repoList={repoList} index={selectedRepo} />
            ) : (
              <Branches repoList={repoList} index={selectedRepo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
