import { Form, useLoaderData, redirect, json, useActionData, createCookie } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { getSession, commitSession } from "~/session.js";

export async function action({ request }) {
  const db = await connectDb();

  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const user = await db.models.User.findOne(
    { username: username },
    { password: password }
  );

    if (user){

        const session = await getSession(request.headers.get("Cookie"));
        session.set("userId", user._id);

        return redirect("/", {
            headers: {
            "Set-Cookie": await commitSession(session),
            },
        });
    } else {
        return json ({ errorMessage: "user not found"})
    }

}


export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const secretCookie = createCookie("user-prefs", {
    secrets: [process.env.COOKIE_SECRET],
  });
  
  return json({
    userId: session.get("userId"),
  });
}

export default function Login() {
  const { userId } = useLoaderData();
  const actionData = useActionData();
  return (
    <div className="p-8 m-8 text-slate-800 shadow-lg xl:w-1/3 lg:w-1/2">
      <h1 className="text-2xl font-bold mb-8">Login</h1>
      <div>
        {!userId ? (
          <Form method="post">
            <input type="text" name="username" placeholder="Username"></input>
            <input
              type="password"
              name="password"
              placeholder="Password"
            ></input>
            {actionData?.errorMessage}
            <button
              type="submit"
              name="login"
              className="mt-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 border border-indigo-600"
            >
              Login
            </button>
          </Form>
        ) : (
          <Form method="post" action="/logout">
            <button
              type="submit"
              name="logout"
              className="mt-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 border border-indigo-600"
            >
              Log out
            </button>
          </Form>
        )}

        {userId}
      </div>
    </div>
  );
}
