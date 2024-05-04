import { GetBookType } from "../../model/types";

export interface BookCreateModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setBooks:React.Dispatch<React.SetStateAction<GetBookType[]>>
  }