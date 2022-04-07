import { useLoaderData, Link, Form, json, useSearchParams } from "remix";
import connectDb from "~/db/connectDb.server.js";
import React, { useState } from "react";
import Button from "~/components/Button.jsx";

export async function loader({ request }) {
  const db = await connectDb();
  const notes = await db.models.Note.find();
  let snippets;
  const url = new URL(request.url);
  const action = url.searchParams.get("title");
  const query = url.searchParams.get("query");
  if (query) {
    snippets = await db.models.Note.find(
      query
        ? {
            title: { $regex: new RegExp(query, "i") },
          }
        : {}
    );
  } else if (action) {
    snippets = await db.models.Note.find().sort({
      title: 1,
    });
  } else {
    snippets = db.models.Note.find();
    return snippets;
  }

  return notes.filter((snippet) =>
  query ? snippet.title.toLowerCase().includes(query.toLowerCase()) : true
);
  
}

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  let { title, id, ...values } = Object.fromEntries(form);

  const actionType = form.get("_action");
  const noteId = form.get("id");
  const isFav = form.get("fav");

  switch (actionType) {
    case "favorite":
      try {
        await db.models.Note.findByIdAndUpdate(noteId, {
          fav: isFav === "true" ? false : true,
        });

        return null;
      } catch (error) {
        return json(
          { errors: error.errors, values: Object.fromEntries(form) },
          { status: 400 }
        );
      }
    default:
      return null;
  }
}

export default function Index() {
  const notes = useLoaderData();
  const [showSnip, setSnip] = useState(null);
  const [searchParams] = useSearchParams();

  const toggle = (i) => {
    if (showSnip == i) {
      return setSnip(null);
    }
    setSnip(i);
    console.log(notes);
  };
  return (
    <div className="main">
      <div className="snippets">
        <div className="sniphead">
          <h2>Snippets</h2>
          <Link to="/new" className="ml-3 hover:underline text-white-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
        </div>
        <Form method="get">
          <input
            className="search"
            type="text"
            placeholder="search"
            name="query"
            defaultValue={searchParams.get("query")}
          />
          <button type="submit">search</button>
        </Form>
        <div className="Sort">
          <Form>
            <Button type="submit" name="_title" value="sortTitle">
              Title
            </Button>
            <Button type="submit" name="_update" value="lastUpdate">
              Last Update
            </Button>
            <Button type="submit" name="_favorite" value="sortFav">
              Favorite
            </Button>
          </Form>
        </div>
        <ul>
          {notes.map((note, i) => {
            return (
              <li
                className="snipresume"
                key={note._id}
                onClick={() => toggle(i)}
              >
                <label>{note.title}</label>
                <br></br>
                <label>{note.language}</label>

                <div className="icons">
                  <Link
                    to={`update/${note._id}`}
                    className="ml-3 hover:underline text-white-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="content">
        <div className="snippetfield">
          <h2>Code</h2>

          {notes.map((note, i) => {
            return (
              <div
                className={showSnip == i ? "block" : "hidden"}
                key={note._id}
                id={note._id}
              >
                <h2>{note.title}</h2>
                <h3>language: {note.language}</h3>
                <br></br>
                <p>Code: {note.code}</p>
                <br></br>
                <h3>Description: {note.description}</h3>

                <Form method="post">
                  <input type="hidden" name="id" value={note._id} />
                  <input
                    type="hidden"
                    name="fav"
                    value={note.fav?.toString()}
                  />

                  <button type="submit" name="_action" value="favorite">
                    {" "}
                    {note.fav == true ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    )}
                  </button>
                </Form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
