import axios from "axios";
import { BASE_URL } from "../../../utils/api_url";
import { SignUpType } from "./types";

interface ErrorResponse {
  message: string;
}

export async function UserCreate(body: object): Promise<SignUpType> {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, body);
    localStorage.setItem("userData", JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = error as any;
      const errorResponse: ErrorResponse = axiosError.response.data;
      // localStorage ga errorResponse obyektini saqlash
      localStorage.setItem("errorResponse", JSON.stringify(errorResponse));
      
      throw new Error(errorResponse.message);
    } else {
      throw new Error("Error posting signup data: " + error);
    }
  }
}
