export interface SnakBarProps{
    openSnak: boolean;
    setOpenSnak: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    isError: boolean
}