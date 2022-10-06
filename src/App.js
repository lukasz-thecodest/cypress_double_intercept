import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleClickOpen = () => {
    fetch("test_data")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setMessage("Something went wrong!");
        }
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        setMessage("Something went wrong!");
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ position: "fixed", left: "50%", top: "50%" }}
        id="fetch_button"
      >
        Get data from web
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"The data from API"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="message">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus id="ok_button">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
