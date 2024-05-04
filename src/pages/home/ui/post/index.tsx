import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BookCreateModalProps } from "./modal.props";
import { ModalHeader, ModalFooter } from "./styled-index";
import { Button, IconButton, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMutation } from "react-query";
import { CreateBook, GetBook } from "../../model/api";
import CustomizedSnackbars from "../../../../components/snackbar/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

const BookCreateModal: React.FC<BookCreateModalProps> = ({ open, setOpen , setBooks }) => {
  const handleClose = () => setOpen(false);
  const [bookCode, setBookCode] = useState<string>("");
  const [openSnak, setOpenSnak] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const createBookMutation = useMutation(CreateBook, {
    onSuccess: () => {
      handleClose();
      setOpenSnak(true);
      GetBook().then(response => setBooks(response.data)).catch(error => {
        console.error("Xatolik yuz berdi:", error);
        throw new Error(
          "Kitob malumotlarini olishda xatolik yuz berdi: " + error
        );
      });
    },
    onError: (error: any) => {
      const storedError = localStorage.getItem("errorBookResponse");
      if (storedError && error) {
        const errorResponse = JSON.parse(storedError);
        setMessage(errorResponse.message);
        setIsError(true);
      }
    }
  });

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    createBookMutation.mutate({ isbn: bookCode });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component={ModalHeader}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a book
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
          <TextField
            required
            error={Boolean(message)}
            sx={{ width: "100%", borderRadius: "10px" }}
            id="outlined-basic"
            label="ISBN"
            type="number"
            margin="normal"
            variant="outlined"
            onChange={(e) => setBookCode(e.currentTarget.value)}
            helperText={message}
          />
          <Box component={ModalFooter}>
            <Button
              onClick={handleClose}
              sx={{ width: "45%", borderColor: "#6200EE", color: "#6200EE" }}
              variant="outlined"
            >
              Close
            </Button>
            <Button
              sx={{ width: "45%", background: "#6200EE" }}
              variant="contained"
              type="button"
              disabled={bookCode ? false : true}
              onClick={handleCreateBook}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <CustomizedSnackbars
        openSnak={openSnak}
        setOpenSnak={setOpenSnak}
        isError={isError}
        message={"Create a book succes"}
      />
    </div>
  );
};

export default BookCreateModal;
