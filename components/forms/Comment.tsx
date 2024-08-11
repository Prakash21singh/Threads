"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  threadId: string;
  currentUserId: string;
  currentUserImg: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex item-center gap-3 w-full">
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt="Profile-img"
                    width={48}
                    height={48}
                    className="rounded-full object-cover max-w[48px] max-h-[48px]"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    {...field}
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
