import { useLoaderData} from "remix";
import connectDb from "~/db/connectDb.server.js";
import React, {useState} from "react";

export async function loader() {
  const db = await connectDb();
  const notes = await db.models.Note.find();
  return notes;


}

export default function Index() {
  const notes = useLoaderData();
  const [showSnip, setSnip] = useState(null);

  const toggle = (i) => {
    if (showSnip ==i){
      return setSnip(null)
    }
    setSnip(i);
    console.log(notes);
  }
  return (
    <div className="main">
        <div className="language">
          <h1 className="text-1xl font-bold">Lanuguage</h1>
  
        </div>

        <div className="snippets">
            <h2>Snippets</h2>     
            <button></button>
            <input className="search" type="text" placeholder="search"/>
              <ul>
                  {notes.map((note, i) => {
                    return (
                        <li  className="snipresume" key={note._id} onClick={() =>toggle(i)}>
                            <label>{note.title}</label>

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
                      <div className={showSnip == i ? 'block' : 'hidden'}  key={note._id} id={note._id}>
                        <h2>{note.title}</h2>
                            <h3>language: {note.language}</h3><br></br>
                            <p>Code: {note.code}</p><br></br>
                            <h3>Description: {note.description}</h3>
                            


                      </div>
                      );
                  })}
                
                </div>

        </div>
    </div>
  );
}