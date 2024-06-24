import {
    Form,
    useLoaderData,
    useNavigation,
    useParams,
  } from "@remix-run/react";
  import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
  import { db } from "~/db.server";
  
  // Define types for Loader and Action functions
  type LoaderData = {
    comments: { id: string; message: string; createdAt: Date }[];
  };
  
  export const loader: LoaderFunction = async ({ params }) => {
    const movieId = params.id;
  
    if (!movieId) {
      throw new Response("Movie ID not found", { status: 404 });
    }
  
    const comments = await db.comment.findMany({
      where: { movieId },
      orderBy: { createdAt: "desc" },
    });
  
    return json<LoaderData>({ comments });
  };
  
  export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const message = formData.get("comment");
    const movieId = formData.get("id");
  
    if (typeof message !== "string" || typeof movieId !== "string") {
      return json({ error: "Invalid form data" }, { status: 400 });
    }
  
    const newComment = await db.comment.create({
      data: { message, movieId },
    });
  
    return json({ comment: newComment });
  };
  
  export default function Comments() {
    const { id } = useParams<{ id: string }>();
    const { comments } = useLoaderData<LoaderData>();
    const navigation = useNavigation();
  
    return (
      <div className="rounded-lg border p-3">
        <h2 className="text-xl font-semibold mb-3">Your Opinion</h2>
        <Form method="post">
          <textarea
            name="comment"
            className="border border-teal-500 rounded-lg p-2 w-full"
            required
          ></textarea>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="bg-teal-500 px-4 py-2 rounded-lg text-white mt-3"
          >
            {navigation.state === "submitting" ? "Loading..." : "Add Comment"}
          </button>
        </Form>
  
        <div className="mt-5 flex flex-col gap-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex justify-between items-start gap-x-3">
              <p>{comment.message}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  