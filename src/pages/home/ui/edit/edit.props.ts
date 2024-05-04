import { GetBookType } from "../../model/types";

export interface BookEditModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: number
    setBooks:React.Dispatch<React.SetStateAction<GetBookType[]>>
  }