import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import MainScreen from "../../components/MainScreen/MainScreen";
import ReactMarkDown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { createNote } from "../../redux/actions/notesActions";
import ErrorMessage from "../../components/error/ErrorMessage";
import Loading from "../../components/Loading/Loading ";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);

  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    dispatch(createNote(title, content, category));

    resetHandler();
    history.push("/mynotes");
  };

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit = {submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                rows={6}
                placeholder="Enter the Content"
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkDown>{content}</ReactMarkDown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="centent"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type = "submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Created on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
