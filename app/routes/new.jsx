import { Link, redirect, useActionData, Form, json } from "remix";
import Button from "~/components/Button.jsx";
import connectDb from "~/db/connectDb.server.js";


  export default function NewSnippet() {
    const actionData = useActionData();
    return (

        <><Label htmlFor="title">Title</Label>
            <Form method="post" className="postForm">
            <input type="text" id="text" name="text"></input>
            <input type="text" id="title" name="title"></input>
            <input type="text" id="code" name="code"></input>
            <input type="text" id="description" name="description"></input>


            {actionData?.errors.name ? (
                <p style={{ color: "red" }}>{actionData.errors.name}</p>
            ) : null}

            {actionData?.errors.description ? (
                <p style={{ color: "red" }}>{actionData.errors.description}</p>
            ) : null}

            <div className="submitbutton">
                <Button type="submit">Add snippet</Button>
            </div>
        </Form></>
      

    );
  }