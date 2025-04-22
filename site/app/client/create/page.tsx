export const dynamic = 'force-dynamic'
import { AddressType } from "@/components/Address";
import { AddressArrayInput } from "@/components/AddressArrayInput";
import { ClientType } from "@/components/Client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function CreateClient(): Promise<ReactNode> {
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

    async function createClient(formData: FormData) {
        "use server";
        const client_name = formData.get("client_name");
        const client_telephone = formData.get("client_telephone");
        const client_notes = formData.get("client_notes");
        if (client_name === null || client_telephone === null || client_notes === null) {
            return;
        }
        const client_address_count = formData.get("client_address_count");
        const client_addresses = new Array<{address:AddressType}>();
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
                continue;
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
            id: null,
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
        await fetch(request).then(data => data.json());
        redirect("/client");
    }

    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Създаване на клиент</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={createClient}>
            <label>Име</label>
            <input type="text" name="client_name" required  className="bg-slate-100"/>
            <label>Телефон</label>
            <input type="text" name="client_telephone" required className="bg-slate-100"/>
            <label>Бележки</label>
            <input type="text" name="client_notes" required className="bg-slate-100"/>
            <AddressArrayInput countName="client_address_count" fieldName="client_address" fieldString="Адрес на клиент" data={ADDRESSES} startingInputs={new Array<AddressType>(1)}/>
            <button type="reset" className="bg-green-500 rounded-md m-4 text-2xl">Clear</button>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Save</button>
        </form>
    </div>);
}
