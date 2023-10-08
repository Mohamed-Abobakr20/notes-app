import React, { useContext, useState } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Note({ note, getUserNotes }) {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { deleteNote, updateNote } = useContext(NoteContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deleteUserNote() {
    setDeleteLoading(true);
    const { data } = await deleteNote(note._id);
    setDeleteLoading(false);

    if (data.msg === "done") {
      getUserNotes();
    }
  }

  const formik = useFormik({
    initialValues: {
      title: `${note.title}`,
      content: `${note.content}`,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required field"),
      content: Yup.string().required("Required field"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { data } = await updateNote(note._id, values);
      setLoading(false);

      if (data.msg === "done") {
        handleClose();
        getUserNotes();
      }
    },
  });

  return (
    <>
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
              "Update"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
            <button
              className="btn me-3 bg-primary text-white"
              onClick={handleShow}>
              <i className="fa-solid fa-pen-to-square"></i> Update
            </button>
            <button
              className="btn bg-danger text-white"
              onClick={deleteUserNote}>
              {deleteLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i className="fa-solid fa-trash"></i> Remove
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
