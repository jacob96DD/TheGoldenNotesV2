import { useLoaderData, useCatch, JSON } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const book = await db.models.Book.findById(params.bookId);

    if (!book){
      throw new Response ("Not found", {status 404});
    }
    return JSON(book);
}



export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <code>
        <pre>{JSON.stringify(book, null, 2)}</pre>
      </code>
    </div>
  );
}

export function catachBoudary () {
  const caught = useCatch();

  return (
  <div>
    <h1>{caught.status} {caught.statusText}</h1>
    <h2>{caught.data}</h2>
  </div>
  );
}

