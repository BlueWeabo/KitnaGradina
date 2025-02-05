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
    console.log(ADDRESS);
    async function editProduct(formData: FormData) {
        "use server";
        console.log(formData);
        let id = formData.get("id");
        let address_address = formData.get("address_address");
        if (id === null || address_address === null) {
            return;
        }
        let address: AddressType = {
            id: id.toString() as UUID,
            address: address_address.toString(),
        }
        let request: Request = new Request(process.env.API_SERVER + "/address/save", {
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
        console.log(formData);
        let id = formData.get("id");
        let address_address = formData.get("address_address");
        if (id === null || address_address === null) {
            return;
        }
        let address: AddressType = {
            id: id.toString() as UUID,
            address: address_address.toString(),
        }
        let request: Request = new Request(process.env.API_SERVER + "/address/delete", {
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
        <div className="mt-12 col-span-2 text-center text-3xl">Creating Product</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={editProduct}>
            <label>Address</label>
            <input type="text" name="address_address" required defaultValue={ADDRESS.address} />
            <Link href="/address" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl text-center">Exit</Link>
            <button type="submit" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl">Save</button>
            <input type="text" name="id" hidden defaultValue={address_id} />
        </form>
        <form className="grid grid-cols-2 col-span-2" action={deleteProduct} >
            <input type="text" name="address_address" required defaultValue={ADDRESS.address} hidden/>
            <input type="text" name="id" hidden defaultValue={address_id} />
            <button type="submit" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl">Delete</button>
        </form>
    </div>);
}
