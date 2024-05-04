import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnakBarProps } from "./snakbar.props";

const CustomizedSnackbars: React.FC<SnakBarProps> = ({
    openSnak,
    setOpenSnak,
    message,
    isError
}) => {
    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnak(false);
    };

    return (
        <div>
            <Snackbar
                open={openSnak}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={isError === true ? "error": "success"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomizedSnackbars;
