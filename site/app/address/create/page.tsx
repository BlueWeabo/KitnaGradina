import { AddressType } from "@/components/Address";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function CreateProduct(): ReactNode {
    async function createAddress(formData: FormData) {
        "use server";
        console.log(formData);
        let address_address = formData.get("address_address");
        if (address_address === null) {
            return;
        }
        let address: AddressType = {
            id: null,
            address: address_address.toString()
        }
        let request: Request = new Request(process.env.API_SERVER + "/address/save", {
            method: "POST",
            body: JSON.stringify(address),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        fetch(request).then((response) => response.json()).then((json) => {
            console.log(json);
        });
        redirect("/address");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Създаване на адрес</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={createAddress}>
            <label>Address</label>
            <input type="text" name="address_address" required />
            <button type="reset" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl">Clear</button>
            <button type="submit" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl">Save</button>
        </form>
    </div>);
}
