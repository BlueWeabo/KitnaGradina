export const dynamic = 'force-dynamic'
import { ClientType } from "@/components/Client";
import { UUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function EditClient({ params }: { params: Promise<{ client_id: UUID }> }): Promise<ReactNode> {
    const client_id = (await params).client_id;
    const CLIENT: ClientType = await fetch(process.env.API_SERVER + "/client/id/" + client_id, {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        },
    }).then(data => data.json());
    async function editProduct(formData: FormData) {
        "use server";
        const id = formData.get("id");
        const client_name = formData.get("client_name");
        const client_telephone = formData.get("client_telephone");
        const client_notes = formData.get("client_notes");
        if (id === null || client_name === null || client_telephone === null || client_notes === null) {
            return;
        }
        const client: ClientType = {
            id: id.toString() as UUID,
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
    async function deleteProduct(formData: FormData) {
        "use server"
        const id = formData.get("id");
        const client_name = formData.get("client_name");
        const client_telephone = formData.get("client_telephone");
        const client_notes = formData.get("client_notes");
        if (id === null || client_name === null || client_telephone === null || client_notes === null) {
            return;
        }
        const client: ClientType = {
            id: id.toString() as UUID,
            name: client_name.toString(),
            telephone: client_telephone.toString(),
            notes: client_notes.toString(),
        }
        const request: Request = new Request(process.env.API_SERVER + "/client/delete", {
            method: "DELETE",
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
        <div className="mt-12 col-span-2 text-center text-3xl">Редактиране на Клиент</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={editProduct}>
            <label>Име</label>
            <input type="text" name="client_name" required defaultValue={CLIENT.name} />
            <label>Телефон</label>
            <input type="text" name="client_telephone" required defaultValue={CLIENT.telephone} />
            <label>Бележки</label>
            <input type="text" name="client_notes" required defaultValue={CLIENT.notes} />
            <Link href="/client" className="bg-green-500 rounded-md m-4 text-2xl text-center">Назад</Link>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Запази</button>
            <input type="text" name="id" hidden defaultValue={client_id} />
        </form>
        <form className="grid grid-cols-2 col-span-2" action={deleteProduct} >
            <input type="text" name="client_name" required defaultValue={CLIENT.name} hidden/>
            <input type="text" name="client_telephone" required defaultValue={CLIENT.telephone} hidden/>
            <input type="text" name="client_notes" required defaultValue={CLIENT.notes} hidden/>
            <input type="text" name="id" hidden defaultValue={client_id} />
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Изтрий</button>
        </form>
    </div>);
}
