import { useEffect, useState } from "react";
import { Link, redirect, useActionData, useLoaderData, Form, json } from "remix";
import Button from "~/components/Button.jsx";
import connectDb from "~/db/connectDb.server.js";


  export async function action({ request }) {
    const form = await request.formData();
    const db = await connectDb();
    const id = form.get("id");
    

    try {
      await db.models.Note.findByIdAndUpdate( id, { 
        title: form.get("title"),
        language: form.get("language"),
        code: form.get("code"),
        description: form.get("description")
        });
      return redirect(`/`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }


export async function loader({params}) {
    const db = await connectDb();
    const nodes = await db.models.Note.findById(params.snippetid);
    return nodes;
    }


  export default function Snippet() {
    const actionData = useActionData();
    const note = useLoaderData();

    const [language, setLanguage] = useState();
    const [title, setTitle] = useState();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();

    function updateLanguage(e){
        setLanguage(e.value);
    }

    function updateTitle(e){
        setTitle(e.value);
    }

    function updateCode(e){
        setCode(e.value);
    }

    function updateDescription(e){
        setDescription(e.value);
    }

    useEffect(()=>{
        setTitle(note.title);
        setLanguage(note.language);
        setCode(note.code);
        setDescription(note.description);

    },[]
    );

   

    return (
            <div>
   
            <Form method="post" className="postForm" action="">
                <input type="hidden" name="id" defaultValue={note._id}/>
                 <label htmlFor="language">Language</label>
            <input type="text" id="language" name="language" value={language} onChange={updateLanguage}></input>

                <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title} onChange={updateTitle}></input>

                <label htmlFor="code">Code</label>
            <textarea type="text" id="code" name="code" className="bigField" value={code} onChange={updateCode}></textarea>

                <label htmlFor="description">Description</label>
            <textarea type="text" id="description" name="description" className="bigField" value={description} onChange={updateDescription}></textarea>

            <div className="submitbutton">
                <Button type="submit">Edit snippet</Button>
            </div>

            </Form>

            <Form method="post" className="postForm" action="/delete">
            <input type="hidden" name="id" value={note._id}/>
                <div className="deletebutton">
                    <Button type="submit">Delete snippet</Button>
                </div>  
            </Form>

            </div>
    );

    
  }