import axios from "axios";
import { BASE_URL } from "../../../utils/api_url";
import { CreateBookType, ErrorBookResponse, GetBookType, PutBookType } from "./types";
import { generateAuth } from "../../../utils/auth";

export async function CreateBook(body: object): Promise<CreateBookType> {
  try {
    // localStorage dan userData obyektini olish
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("userData topilmadi");
    }
    const userData = JSON.parse(userDataString);

    // generateAuth funksiyasini ishlatish
    const sign = await generateAuth(
      "POST",
      "/books",
      JSON.stringify(body),
      userData.data.secret
    );

    // Axios orqali so'rovni yuborish
    const response = await axios.post(`${BASE_URL}/books`, body, {
      headers: {
        Key: userData.data.key,
        Sign: sign,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = error as any;
      const errorResponse: ErrorBookResponse = axiosError.response.data;
      // localStorage ga errorBookResponse obyektini saqlash
      localStorage.setItem("errorBookResponse", JSON.stringify(errorResponse));
      
      throw new Error(errorResponse.message);
    } else {
      throw new Error("Error posting book data: " + error);
    }
  }
}

export async function GetBook(): Promise<GetBookType> {
  try {
    // localStorage dan userData obyektini olish
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("userData topilmadi");
    }
    const userData = JSON.parse(userDataString);

    // generateAuth funksiyasini ishlatish
    const sign = await generateAuth("GET", "/books", "", userData.data.secret);

    // Axios orqali so'rovni yuborish
    const response = await axios.get(`${BASE_URL}/books`, {
      headers: {
        Key: userData.data.key,
        Sign: sign,
      },
    });

    return response.data;
  } catch (error) {
    // Xatolikni aniqlash va uni qaytarish
    console.error("Xatolik yuz berdi:", error);
    throw new Error("Kitob malumotlarini olishda xatolik yuz berdi: " + error);
  }
}

export async function PutBook(body: object, id: number): Promise<PutBookType> {
  try {
    // localStorage dan userData obyektini olish
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("userData topilmadi");
    }
    const userData = JSON.parse(userDataString);

    // generateAuth funksiyasini ishlatish
    const sign = await generateAuth(
      "PATCH",
      `/books/${id}`,
      JSON.stringify(body),
      userData.data.secret
    );

    // Axios orqali so'rovni yuborish
    const response = await axios.patch(`${BASE_URL}/books/${id}`, body, {
      headers: {
        Key: userData.data.key,
        Sign: sign,
      },
    });

    return response.data;
  } catch (error) {
    // Xatolikni aniqlash va uni qaytarish
    console.error("Xatolik yuz berdi:", error);
    throw new Error("Kitob yaratishda xatolik yuz berdi: " + error);
  }
}

export async function DeleteBook(id: number): Promise<void> {
  try {
    // localStorage dan userData obyektini olish
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("userData topilmadi");
    }
    const userData = JSON.parse(userDataString);

    // generateAuth funksiyasini ishlatish
    const sign = await generateAuth(
      "DELETE",
      `/books/${id}`,
      "",
      userData.data.secret
    );

    // Axios orqali so'rovni yuborish
    const response = await axios.delete(`${BASE_URL}/books/${id}`, {
      headers: {
        Key: userData.data.key,
        Sign: sign,
      },
    });

    return response.data;
  } catch (error) {
    // Xatolikni aniqlash va uni qaytarish
    console.error("Xatolik yuz berdi:", error);
    throw new Error("Kitob yaratishda xatolik yuz berdi: " + error);
  }
}

export async function SearchBook(title: string): Promise<GetBookType> {
  try {
    // localStorage dan userData obyektini olish
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("userData topilmadi");
    }
    const userData = JSON.parse(userDataString);

    // generateAuth funksiyasini ishlatish
    const sign = await generateAuth("GET", `/books/${title}`, "", userData.data.secret);

    // Axios orqali so'rovni yuborish
    const response = await axios.get(`${BASE_URL}/books${title}`, {
      headers: {
        Key: userData.data.key,
        Sign: sign,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = error as any;
      const errorSearchResponse: ErrorBookResponse = axiosError.response.data;
      // localStorage ga errorBookResponse obyektini saqlash
      localStorage.setItem("errorSearchResponse", JSON.stringify(errorSearchResponse));
      
      throw new Error(errorSearchResponse.message);
    } else {
      throw new Error("Error posting book data: " + error);
    }
  }
}
