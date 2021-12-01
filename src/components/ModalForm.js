import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ModalForm(props) {
  const [show, setShow] = useState(false);
  const [repoInfo, setRepoInfo] = useState({
    owner: "",
    repo: "",
  });

  const handleFormChange = event => {
    const { name, value } = event.target;
    setRepoInfo({ ...repoInfo, [name]: value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = async () => {
    await props.setRepoInfo(repoInfo.owner, repoInfo.repo);
    setRepoInfo({ owner: "", repo: "" });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Repo
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              handleFormSubmit();
              event.preventDefault();
              handleClose();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Owner Or Organization</Form.Label>
              <Form.Control
                name="owner"
                type="text"
                onChange={handleFormChange}
                placeholder="org/name"
                value={repoInfo.owner}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repository Name</Form.Label>
              <Form.Control
                name="repo"
                type="text"
                onChange={handleFormChange}
                placeholder="repo-name"
                value={repoInfo.repo}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
