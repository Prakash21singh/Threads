"use server";
import { revalidatePath } from "next/cache.js";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
// CREATE THREADS
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread ${error.message}`);
  }
}

// FETCH ALL THREADS
export async function fetchPost(pageNumber = 1, pageSize = 20) {
  try {
    connectDB();

    // Fetch post that have no parents
    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostCount > skipAmount + posts.length;

    return {
      posts,
      isNext,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }
}

export async function getThreadById(id: string) {
  try {
    connectDB();

    // Populate community
    let post = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return post;
  } catch (error: any) {
    throw new Error("Error getting thread by ID:", error.message);
  }
}
