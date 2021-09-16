import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading/Loading ";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error/ErrorMessage";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { deleteNote, updateNote } from "../../redux/actions/notesActions";

const SingleNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const noteDelete = useSelector(state => state.noteDelete);

  const { loading, error } = noteUpdate;
  const {loading:deleteLoading, error:deleteError, success } = noteDelete;

  const match = useParams();
  const history = useHistory();

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;

    dispatch(updateNote(match.id, title, content, category));
    resetHandler();

    history.push("/mynotes");
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(match.id));
    }

    history.push("/mynotes");
  }

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.id, date, success]);

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit Your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
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
                  <ReactMarkdown>{content}</ReactMarkdown>
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
            {loading && <Loading size = {50} />}
            <Button type="submit" variant="primary">
              Update Note
            </Button>
            <Button className="mx-2" onClick = {deleteHandler} variant="danger">
              Delete Note
            </Button>
          </Form>
          <br />
          <Card.Footer className="text-muted">
            Update on - {date.substring(0, 10)}
          </Card.Footer>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
