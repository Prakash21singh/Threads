"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDB } from "../mongoose";
type IUpdateUser = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  path: string;
  image: string;
};
export async function updateUser({
  userId,
  username,
  name,
  bio,
  path,
  image,
}: IUpdateUser): Promise<void> {
  await connectDB();
  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
