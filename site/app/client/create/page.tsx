export const dynamic = 'force-dynamic'
import { ClientType } from "@/components/Client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function CreateClient(): ReactNode {
    async function createClient(formData: FormData) {
        "use server";
        const client_name = formData.get("client_name");
        const client_telephone = formData.get("client_telephone");
        const client_notes = formData.get("client_notes");
        if (client_name === null || client_telephone === null || client_notes === null) {
            return;
        }
        const client: ClientType = {
            id: null,
            name: client_name.toString(),
            telephone: client_telephone.toString(),
            notes: client_notes.toString(),
        }
        const request: Request = new Request(process.env.API_SERVER + "/client/save", {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        fetch(request);
        redirect("/client");
    }

    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Създаване на клиент</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={createClient}>
            <label>Име</label>
            <input type="text" name="client_name" required />
            <label>Телефон</label>
            <input type="text" name="client_telephone" required />
            <label>Бележки</label>
            <input type="text" name="client_notes" required />
            <button type="reset" className="bg-green-500 rounded-md m-4 text-2xl">Clear</button>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Save</button>
        </form>
    </div>);
}
