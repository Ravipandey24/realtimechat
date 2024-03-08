"use server";

import { cookieExpiryDate } from "@/lib/utils";
import { cookies } from "next/headers";
import {
  addMessageToGeneralChatDB,
  addUserToDB,
  deleteUserFromDB,
  getAllUsersFromDB,
} from "./redis";
import { Message, messageValidator } from "@/lib/validations";
import { nanoid } from "nanoid";
import { pusherServer } from "@/lib/pusher";

export async function createUsername(username: string) {
  try {
    const cookieStore = cookies();
    const { users, success } = await getAllUsersFromDB();
    if (!success) {
      return {
        success: false,
        message: "something went wrong while creating the username.",
      };
    }
    if (success && users.includes(username)) {
      return { success: false, message: "Username already exists!" };
    }
    await addUserToDB(username);
    cookieStore.set("username", username, { expires: cookieExpiryDate(7) });
    return { success: true, message: "Username created succesfully!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while creating the username.",
    };
  }
}
export async function getUsername() {
  const cookieStore = cookies();
  return cookieStore.get("username")?.value;
}
export async function logout(username: string) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("username");
    await deleteUserFromDB(username);
    return { success: true, message: "logged out!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "something went wrong!" };
  }
}

export async function sendMessageToGeneralChat(message: Message) {
  try {
    const messageObject = messageValidator.parse(message);
    await addMessageToGeneralChatDB(messageObject);
    await pusherServer.trigger("general-chat", "incoming-message", message);
  } catch (error) {
    console.error(error);
  }
}
