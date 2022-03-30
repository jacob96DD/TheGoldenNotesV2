import { Link, redirect, useActionData, Form, json } from "remix";
import Button from "~/components/Button.jsx";
import connectDb from "~/db/connectDb.server.js";

export const action = async ({ request }) => {
    const formData = await request.formData();
  
    const language = formData.get("language");
    const title = formData.get("title");
    const code = formData.get("code");
    const description = formData.get("description");
  
    const errors = {};
    if (!title) errors.title = true;
    if (!description) errors.description = true;
  
    if (Object.keys(errors).length) {
      const values = Object.fromEntries(formData);
      return json({ errors, values });
    }
  
    await fetch(`http://localhost:3000/api/kids-fashion/`, {
      method: "POST",
      body: JSON.stringify({ title, description, id: uuid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // TODO: Make a POST request via fetch to an API route that receives JSON data
    // and creates the product in the db
    // throw new Error("POST handler not implemented");
  
    return redirect(`../`);
  };


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