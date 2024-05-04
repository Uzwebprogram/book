import React, { useEffect, useState } from "react";
import Layout from "../../../layout/index";
import { Box, Container, Grid, Typography } from "@mui/material";
import { TopBox, Heading, Span, CreateButton, GridWrapper, NoData } from "./styled-index";
import BookCard from "./card/card";
import BookCreateModal from "./post";
import { GetBook, SearchBook } from "../model/api";
import { GetBookType } from "../model/types";
import CustomizedSnackbars from "../../../components/snackbar/index";

export const HomePage: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const [books, setBooks] = useState<GetBookType[]>([]);
  const [message, setMessage] = useState<string>('')
  const [openSnak, setOpenSnak] = useState(false);
  const [isError, setIsError] = useState<boolean>(false)
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await GetBook();
        setBooks(response.data);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        throw new Error(
          "Kitob malumotlarini olishda xatolik yuz berdi: " + error
        );
      }
    };
    getBooks();
  }, []);

  const handleSearch = async (title: string) => {
    try {
      await SearchBook(title)

    } catch (error) {
      const storedError = localStorage.getItem("errorSearchResponse");
      if (storedError && error) {
        const errorResponse = JSON.parse(storedError);
        setMessage(errorResponse.message);
        setOpenSnak(true);
        setIsError(true)
      }
    }
  }

  return (
    <>
      <Layout handleSearch={handleSearch}>
        <Container maxWidth="lg">
          <Box component={TopBox}>
            <Heading variant="h4">
              You’ve got <Span variant="h4">{!books?.length ? 0 : books?.length} book</Span>
            </Heading>
            <CreateButton onClick={handleOpen}>+ Create a book</CreateButton>
          </Box>
          <Box component="div">
            <Typography
              variant="h6"
              sx={{ marginBottom: "20px", color: "#fff" }}
            >
              Your books today
            </Typography>
            <Box component={GridWrapper}>
              {
                books?.length ? (
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {books?.map((elem) => (
                      <Grid key={elem.book.id} item xs={4} sx={{ marginBottom: "10px" }}>
                        <BookCard elem={elem} setBooks={setBooks} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{background:'transperent'}} component={NoData} >
                    <iframe src="https://lottie.host/embed/1e313a45-348b-41c2-bf97-53a957c2ef27/SHvEF88PVf.json" style={{background:'transperent' , border:'none' , width:'300px' , height:'300px'}}></iframe>
                    <Typography fontWeight="bold" variant="h5" sx={{marginBottom:'50px'}}>There are currently no books on your shelf</Typography>
                  </Box>
                )
              }
            </Box>
          </Box>
        </Container>
      </Layout>
      <BookCreateModal setBooks={setBooks} open={open} setOpen={setOpen} />
      <CustomizedSnackbars openSnak={openSnak} setOpenSnak={setOpenSnak} isError={isError} message={message} />
    </>
  );
};
