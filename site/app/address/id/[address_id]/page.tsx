export const dynamic = 'force-dynamic'
import { AddressType } from "@/components/Address";
import { UUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function EditProduct({ params }: { params: Promise<{ address_id: UUID }> }): Promise<ReactNode> {
    const address_id = (await params).address_id;
    const ADDRESS: AddressType = await fetch(process.env.API_SERVER + "/address/id/" + address_id, {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        },
    }).then(data => data.json());
    async function editProduct(formData: FormData) {
        "use server";
        const id = formData.get("id");
        const address_address = formData.get("address_address");
        if (id === null || address_address === null) {
            return;
        }
        const address: AddressType = {
            id: id.toString() as UUID,
            address: address_address.toString(),
        }
        const request: Request = new Request(process.env.API_SERVER + "/address/save", {
            method: "POST",
            body: JSON.stringify(address),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        fetch(request);
        redirect("/address");
    }
    async function deleteProduct(formData: FormData) {
        "use server"
        const id = formData.get("id");
        const address_address = formData.get("address_address");
        if (id === null || address_address === null) {
            return;
        }
        const address: AddressType = {
            id: id.toString() as UUID,
            address: address_address.toString(),
        }
        const request: Request = new Request(process.env.API_SERVER + "/address/delete", {
            method: "DELETE",
            body: JSON.stringify(address),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        fetch(request);
        redirect("/address");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Редактиране на адрес</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={editProduct}>
            <label>Адрес</label>
            <input type="text" name="address_address" required defaultValue={ADDRESS.address} />
            <Link href="/address" className="bg-green-500 rounded-md m-4 text-2xl text-center">Назад</Link>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Запази</button>
            <input type="text" name="id" hidden defaultValue={address_id} />
        </form>
        <form className="grid grid-cols-2 col-span-2" action={deleteProduct} >
            <input type="text" name="address_address" required defaultValue={ADDRESS.address} hidden/>
            <input type="text" name="id" hidden defaultValue={address_id} />
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Изтрий</button>
        </form>
    </div>);
}
