import Address, { AddressType } from "@/components/Address";
import Link from "next/link";
import { ReactNode } from "react";


export default async function AddressPage(): Promise<ReactNode> {
    const ADDRESSES: Array<AddressType> = new Array<AddressType>();
    await fetch(process.env.API_SERVER + "/address/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        console.log(json);
        ADDRESSES.push(...json);
    });
    return (<div className="pt-20 grid grid-cols-1 gap-4">
        <div className="bg-green-500 w-full p-4 text-center text-2xl"><Link href="/address/create">Добавяне на адрес</Link></div>
        {ADDRESSES.map(address => <Address key={address.id} address={address} />)}
    </div>);
}
