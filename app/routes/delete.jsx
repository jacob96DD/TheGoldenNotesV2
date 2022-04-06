import connectDb from "~/db/connectDb.server";
import { redirect } from "remix";


export async function action({request}){
    const form = await request.formData();
    const db = await connectDb();
    const id = form._fields.id;
    

    await db.models.Note.deleteOne({_id: id});
    return redirect(`/`);

}

// const id = form._fields.id;
    
    
// if(action === "delete"){
//     try {
//         await db.models.note.deleteOne({_id: id});
//         return redirect(`/`);
//     } catch (error) {
//       return json(
//         { errors: error.errors, values: Object.fromEntries(form) },
//         { status: 400 }
//       );
//     }
//   }else{