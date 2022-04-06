import { Link, redirect, useActionData, Form, json } from "remix";
import Button from "~/components/Button.jsx";
import connectDb from "~/db/connectDb.server.js";


  export async function action({ request }) {
    const form = await request.formData();
    const db = await connectDb();
    try {
      const newSnippet = await db.models.Note.create({ 
        title: form.get("title"),
        language: form.get("language"),
        code: form.get("code"),
        description: form.get("description"),
        fav: false
        });
      return redirect(`/`);
    } catch (error) {
      return json(
        { errors: error.errors, values: Object.fromEntries(form) },
        { status: 400 }
      );
    }
  }

  export default function NewSnippet() {
    const actionData = useActionData();
    return (

   
            <Form method="post" className="postForm">
                 <label htmlFor="language">Language</label>
            <input type="text" id="language" name="language" defaultValue={actionData?.values.language}></input>

                <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={actionData?.values.title}></input>

                <label htmlFor="code">Code</label>
            <textarea type="text" id="code" name="code" className="bigField" defaultValue={actionData?.values.code}></textarea>

                <label htmlFor="description">Description</label>
            <textarea type="text" id="description" name="description" className="bigField" defaultValue={actionData?.values.description}></textarea>

            <div className="submitbutton">
                <Button type="submit">Add snippet</Button>
            </div>
        </Form>
      

    );
  }