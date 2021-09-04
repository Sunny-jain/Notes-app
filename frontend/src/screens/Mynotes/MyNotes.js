import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyNotes.css";
import { listNotes } from "../../redux/actions/notesActions";
import ErrorMessage from "../../components/error/ErrorMessage";
import Loading from "../../components/Loading/Loading ";

const MyNotes = () => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const { loading, notes, error } = noteList;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}..`}>
      <Link to="/createnote">
        <Button className="new" size="lg">
          Create New Note
        </Button>
      </Link>
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {notes?.map((note) => (
        <Accordion key={note._id}>
          <Card>
            <Card.Header>
              <span>
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {note.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>
                  <i className="fa fa-edit"></i> Edit
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  <i className="fa fa-trash"></i> Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Badge variant="success">Category - {note.category}</Badge>
                <p>{note.content}</p>
                <footer className="blockquote-footer">
                  Created On{" "}
                  <cite title="Source Title">
                    {note.createdAt.substring(0, 10)}
                  </cite>
                </footer>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
