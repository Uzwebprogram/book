import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Link,
  ButtonGroup,
  Popper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "react-query"; // React Query import

import {
  BookLink,
  CardFooter,
  Text,
  CardWrapper,
  BtnAction,
  Delete,
  Edit,
  DeleteText
} from "./styled-index";
import { GetBookType } from "../../model/types";
import BookEditModal from "../edit";
import { DeleteBook, GetBook } from "../../model/api";
import CustomizedSnackbars from "../../../../components/snackbar";

interface BookCardProps {
  elem: GetBookType;
  setBooks: React.Dispatch<React.SetStateAction<GetBookType[]>>;
}

const BookCard: React.FC<BookCardProps> = ({ elem, setBooks }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openSnak, setOpenSnak] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPoppor = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const deleteBookMutation = useMutation(() => DeleteBook(elem.book.id), {
    onSuccess: () => {
      setOpenSnak(true);
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

  const handleDeleteBook = async (e: React.FormEvent) => {
    e.preventDefault();
    deleteBookMutation.mutate();
  };

  return (
    <Card component={CardWrapper} sx={{ boxShadow: 3 }}>
      <CardContent sx={{ padding: "10px" }}>
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold", marginBottom: "6px" }}
          color="text.black"
        >
          {elem.book.title === "" ? "No Name" : elem.book.title}
        </Typography>
        <Typography variant="body2">
          Cover:{" "}
          <Link component={BookLink} href={elem.book.cover}>
            {elem.book.cover === "" ? "No data" : elem.book.cover}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.black">
          Pages: {elem.book.pages}
        </Typography>
        <Typography variant="body2" color="text.black">
          Published: {elem.book.published}
        </Typography>
        <Typography variant="body2" color="text.black">
          Isbn: {elem.book.isbn}
        </Typography>
      </CardContent>
      <CardActions>
        <Box width="100%">
          <Box component={CardFooter}>
            <Typography variant="body2" fontWeight="bold" color="text.black">
              {elem.book.author === "" ? "No data" : elem.book.author}
            </Typography>
          </Box>
          <Box component={BtnAction}>
            <ButtonGroup
              sx={{ borderRadius: "10px" }}
              variant="contained"
              aria-label="Basic button group"
            >
              <Delete aria-describedby={id} type="button" onClick={handleClick} key={elem.book.id}>
                <DeleteIcon sx={{ fontSize: "18px" }} />
              </Delete>
              <Popper id={id} open={openPoppor} anchorEl={anchorEl} placement="right-end">
                <Box sx={{ border: 0, p: 2, bgcolor: '#fff', boxShadow: 3, borderRadius: 2 }}>
                  <Typography component={DeleteText}>Are you sure to delete?</Typography>
                  <Delete onClick={handleDeleteBook} key={elem.book.id}>
                    Delete
                  </Delete>
                </Box>
              </Popper>
              <Edit key={elem.book.id} onClick={handleOpen}>
                <EditIcon sx={{ fontSize: "18px" }} />
              </Edit>
            </ButtonGroup>
            <Typography
              variant="body2"
              component={Text}
              sx={{
                background:
                  elem.status === 0
                    ? "#ff0000"
                    : elem.status === 1
                      ? "#FFEC43"
                      : elem.status === 2
                        ? "#00FF29"
                        : "#ff0000",
              }}
            >
              {elem.status === 0
                ? "New"
                : elem.status === 1
                  ? "Reading"
                  : elem.status === 2
                    ? "Finished"
                    : "New"}
            </Typography>
          </Box>
          <BookEditModal setBooks={setBooks} open={open} setOpen={setOpen} id={elem.book.id} />
        </Box>
      </CardActions>
      <CustomizedSnackbars
        openSnak={openSnak}
        setOpenSnak={setOpenSnak}
        isError={false}
        message={"Delete a book success"}
      />
    </Card>
  );
};

export default BookCard;
