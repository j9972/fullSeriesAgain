import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const initialValue = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("u must input title"),
    postText: Yup.string().required("u must input text"),
    username: Yup.string().min(3).max(20).required("u must input username"),
  });

  // axios.post 로 db쪽으로 데이터를 보내줌.
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/");
    });
  };

  // Field의 name은 db의 테이블 column들과 같아야 함
  // autoComplete는 자동완성을 막아준다
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="title.."
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="post.."
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="username.."
          />

          <button type="submit"> Create a Post </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
