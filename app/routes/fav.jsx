import connectDb from "~/db/connectDb.server";
import { redirect } from "remix";


export async function action({request}){
    const form = await request.formData();
    const db = await connectDb();
    const id = form._fields.id;
    

    await db.models.Note.findByIdAndUpdate({_id: id});
    return redirect(`/`);

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

