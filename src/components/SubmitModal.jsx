import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

import PropTypes from "prop-types";
import { getLocalStorageToken } from "../utils";
import putReadme from "../apis/putReadme";
import { useMutation } from "react-query";

const date = new Date();
const defaultMessage = `update on ${date.getFullYear()}-${(
  "0" + date.getMonth()
).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

function SubmitModal(props) {
  const { submitDisabled, getCommitInfo } = props;
  const { githubToken } = getLocalStorageToken();
  const { readme, sha, user } = getCommitInfo();

  const [message, setMessage] = useState(defaultMessage);
  const [open, setOpen] = useState(false);
  const [updateReadme] = useMutation(putReadme);

  const handleChange = (event) => setMessage(event.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    handleClose();
    await updateReadme({
      message,
      token: githubToken,
      readme,
      sha,
      user,
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        disabled={submitDisabled}
        onClick={handleOpen}
      >
        submit
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Commit</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Commit Message"
            placeholder={defaultMessage}
            value={message}
            onChange={handleChange}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Commit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SubmitModal.propTypes = {
  submitDisabled: PropTypes.bool,
  getCommitInfo: PropTypes.func,
};

export default SubmitModal;
