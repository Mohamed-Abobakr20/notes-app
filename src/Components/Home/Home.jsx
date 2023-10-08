import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Note from "../Note/Note";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NoteContext } from "../../Context/NoteContext";

export default function Home() {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { addNote, notes, getNotes, setNotes } = useContext(NoteContext);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  const handleShow = () => setShow(true);

  async function getUserNotes() {
    try {
      const { data } = await getNotes();
      if (data.msg === "done") {
        setNotes(data.notes);
      }
    } catch (error) {
      setNotes([]);
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required field"),
      content: Yup.string().required("Required field"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { data } = await addNote(values);
      setLoading(false);

      if (data.msg === "done") {
        handleClose();
        getUserNotes();
      }
    },
  });

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notes</title>
      </Helmet>
      <button
        onClick={handleShow}
        className="btn bg-primary text-white d-block ms-auto mb-3">
        <i className="fa-solid fa-plus me-2"></i>Add Note
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              id="title"
              name="title"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="form-control"
              value={formik.values.title}
              placeholder="Title"
            />
            {formik.errors.title && formik.touched.title ? (
              <div className="alert alert-danger my-2" role="alert">
                {formik.errors.title}
              </div>
            ) : null}

            <input
              id="content"
              name="content"
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="form-control mt-2"
              placeholder="Content"
              value={formik.values.content}
            />
            {formik.errors.content && formik.touched.content ? (
              <div className="alert alert-danger my-2" role="alert">
                {formik.errors.content}
              </div>
            ) : null}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!(formik.isValid && formik.dirty)}
            variant="primary"
            onClick={() => {
              formik.handleSubmit();
            }}>
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Add"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row g-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Note note={note} key={note._id} getUserNotes={getUserNotes} />
          ))
        ) : (
          <h1>There are no notes</h1>
        )}
      </div>
    </div>
  );
}
