import ThreadCard from "@/components/cards/ThreadCard";
import { getThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const thread = await getThreadById(params.id);
  if (!params.id) return null;
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="relative">
      <div className="">
        <div className="">
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={user?.id || ""}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            isComment={true}
          />
        </div>
      </div>
    </section>
  );
};

export default page;
