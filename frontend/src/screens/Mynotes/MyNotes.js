import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyNotes.css";
import axios from 'axios';

const MyNotes = () => {
  const [notes, setNotes] = useState([])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchNotes = async () => {
    
    const { data } = await axios.get('/api/notes');

    setNotes(data);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome back Sunny jain">
      <Link to="/createnote">
        <Button className="new" size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion key = {note._id}>
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
                <footer className="blockquote-footer">Created On - date</footer>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;