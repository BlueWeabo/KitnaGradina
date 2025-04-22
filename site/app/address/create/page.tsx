export const dynamic = 'force-dynamic'
import { AddressType } from "@/components/Address";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function CreateProduct(): ReactNode {
    async function createAddress(formData: FormData) {
        "use server";
        const address_address = formData.get("address_address");
        if (address_address === null) {
            return;
        }
        const address: AddressType = {
            id: null,
            address: address_address.toString()
        }
        const request: Request = new Request(process.env.API_SERVER + "/address/save", {
            method: "POST",
            body: JSON.stringify(address),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/address");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Създаване на адрес</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={createAddress}>
            <label>Адрес</label>
            <input type="text" name="address_address" required />
            <button type="reset" className="bg-green-500 rounded-md m-4 text-2xl">Изчисти</button>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Добави</button>
        </form>
    </div>);
}
