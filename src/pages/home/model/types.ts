import { SetStateAction } from "react";

export interface CreateBookType {
  data: unknown;
  isbn: string;
}

export interface PutBookType {
  status: number
}

export interface GetBookType {
  data: SetStateAction<GetBookType[]>;
  book: {
    author: string;
    cover: string;
    id: number;
    isbn: string;
    pages: number;
    published: number;
    title: string;
  };
  status: number;
}

export interface ErrorBookResponse {
  message: string;
}

