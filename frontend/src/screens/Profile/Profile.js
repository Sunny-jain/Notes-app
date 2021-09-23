import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error/ErrorMessage";
import { useHistory } from "react-router";
import { update } from "../../redux/actions/userActions";
import Loading from "../../components/Loading/Loading ";
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const submitHandler = (e) => {
    e.preventDefault();

    
    if(password !== "" && password === confirmPassword)
      dispatch(update({name, email, password, pic}));
  };

  const history = useHistory();

  useEffect(() => {
    if(!userInfo){
      history.push("/");
    }

    else{
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  
  }, [history, userInfo])

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select any Image for your profile");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notekeeper");
      data.append("cloud_name", "dqifjbccy");
      fetch("https://api.cloudinary.com/v1_1/dqifjbccy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select a .jpeg or .png image");
    }
  };

  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          {loading && <Loading />}
          {success && (<ErrorMessage variant = "success">Update Successfully</ErrorMessage>)}
          {error && (<ErrorMessage variant = "danger">{error}</ErrorMessage>)}
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter the password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm the password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage} </ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <img src={pic} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Profile;
