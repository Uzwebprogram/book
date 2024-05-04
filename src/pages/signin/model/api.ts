import { generateAuth } from "../../../utils/auth";
import { SignInType } from "./types";
import { BASE_URL } from "../../../utils/api_url";
import axios from "axios";

export async function Login(secret: string, key: string): Promise<SignInType> {
  try {
    // generateAuth funksiyasini ishlatish
    const sign = await generateAuth("GET", "/myself", "", secret);

    // Axios orqali so'rovni yuborish
    const response = await axios.get(`${BASE_URL}/myself`, {
      headers: {
        Key: key,
        Sign: sign,
      },
    });
    localStorage.setItem("userData", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    // Xatolikni aniqlash va uni qaytarish
    console.error("Xatolik yuz berdi:", error);
    throw new Error("Kitob malumotlarini olishda xatolik yuz berdi: " + error);
  }
}
