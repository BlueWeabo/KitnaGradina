export const dynamic = 'force-dynamic'
import { AddressType } from "@/components/Address";
import { AddressArrayInput } from "@/components/AddressArrayInput";
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
    console.log(CLIENT);
    const ADDRESSES = new Array<AddressType>();
    await fetch(new Request(process.env.API_SERVER + "/address/all", {
            method: "GET",
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        })).then(data => data.json()).then(json => {
            ADDRESSES.push(...json)
        });
    async function editClient(formData: FormData) {
        "use server";
        const id = formData.get("id");
        const client_name = formData.get("client_name");
        const client_telephone = formData.get("client_telephone");
        const client_notes = formData.get("client_notes");
        if (id === null || client_name === null || client_telephone === null || client_notes === null) {
            return;
        }
        const client_address_count = formData.get("client_address_count");
        const client_addresses = new Array<{address: AddressType}>();
        if (client_address_count === null) {
            return;
        }
        const loop = new Number(client_address_count);
        for (let i = 0; i < (loop as number); i++) {
            const client_address = formData.get(`client_address_${i}`);
            if (client_address === null) continue;
            if (client_address === "new") {
                const address_address = formData.get(`client_address_${i}_address`);
                if (address_address === null) {
                    continue;
                }
                const address_to_add: AddressType = {
                    id: null,
                    address: address_address.toString(),
                }
                const address: AddressType = await fetch(process.env.API_SERVER + "/address/save", {
                    method: "POST",
                    body: JSON.stringify(address_to_add),
                    headers: {
                        "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                        "Content-type": "application/json",
                    }
                }).then(data => data.json());
                client_addresses.push({address: address});
            }
            const address: AddressType = await fetch(process.env.API_SERVER + "/address/id/" + client_address.toString(), {
                method: "GET",
                headers: {
                    "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                }
            }).then(data => data.json());
            client_addresses.push({address: address});
        }
        const client: ClientType = {
            id: id.toString() as UUID,
            name: client_name.toString(),
            telephone: client_telephone.toString(),
            notes: client_notes.toString(),
            addresses: client_addresses,
        }
        const request: Request = new Request(process.env.API_SERVER + "/client/save", {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/client");
    }
    async function deleteClient(formData: FormData) {
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
            addresses: new Array<{address:AddressType}>(),
        }
        const request: Request = new Request(process.env.API_SERVER + "/client/delete", {
            method: "DELETE",
            body: JSON.stringify(client),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/client");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Редактиране на Клиент</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={editClient}>
            <label className="col-span-2 md:col-span-1">Име</label>
            <input type="text" name="client_name" required defaultValue={CLIENT.name} className="bg-slate-100 col-span-2 md:col-span-1"/>
            <label className="col-span-2 md:col-span-1">Телефон</label>
            <input type="text" name="client_telephone" required defaultValue={CLIENT.telephone} className="bg-slate-100 col-span-2 md:col-span-1"/>
            <label className="col-span-2 md:col-span-1">Бележки</label>
            <input type="text" name="client_notes" required defaultValue={CLIENT.notes} className="bg-slate-100 col-span-2 md:col-span-1"/>
            <AddressArrayInput countName="client_address_count" fieldName="client_address" fieldString="Адрес на клиент" data={ADDRESSES} startingInputs={CLIENT.addresses.map(a=>a.address)}/>
            <Link href="/client" className="bg-green-500 rounded-md m-4 text-2xl text-center">Назад</Link>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Запази</button>
            <input type="text" name="id" hidden defaultValue={client_id} />
        </form>
        <form className="grid grid-cols-2 col-span-2" action={deleteClient} >
            <input type="text" name="client_name" required defaultValue={CLIENT.name} hidden/>
            <input type="text" name="client_telephone" required defaultValue={CLIENT.telephone} hidden/>
            <input type="text" name="client_notes" required defaultValue={CLIENT.notes} hidden/>
            <input type="text" name="id" hidden defaultValue={client_id} />
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Изтрий</button>
        </form>
    </div>);
}
