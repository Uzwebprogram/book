import React, { useState } from "react";
import { ModalHeader, ModalFooter } from "../post/styled-index";
import {
  Button,
  IconButton,
  Select,
  FormControl,
  Box,
  Typography,
  Modal,
  InputLabel,
  MenuItem
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useMutation } from "react-query"; // React Query import

import CancelIcon from "@mui/icons-material/Cancel";
import { GetBook, PutBook } from "../../model/api";
import { BookEditModalProps } from "./edit.props";

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

const BookEditModal: React.FC<BookEditModalProps> = ({
  open,
  setOpen,
  id,
  setBooks
}) => {
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const editBookMutation = useMutation((body: any) => PutBook(body, id), {
    onSuccess: () => {
      handleClose();
      GetBook().then(response => setBooks(response.data)).catch(error => {
        console.error("Xatolik yuz berdi:", error);
        throw new Error(
          "Kitob malumotlarini olishda xatolik yuz berdi: " + error
        );
      });
    },
    onError: (error: any) => {
      console.error(error);
    }
  });

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    editBookMutation.mutate({ status: status });
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
              Edit a book status
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem sx={{ fontWeight: "bold" }} value={0}>
                New
              </MenuItem>
              <MenuItem sx={{ fontWeight: "bold" }} value={1}>
                Reading
              </MenuItem>
              <MenuItem sx={{ fontWeight: "bold" }} value={2}>
                Finished
              </MenuItem>
            </Select>
          </FormControl>
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
              disabled={status ? false : true}
              onClick={handleEditBook}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookEditModal;
