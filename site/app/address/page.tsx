export const dynamic = 'force-dynamic'
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
        ADDRESSES.push(...json);
    });
    return (<div className="pt-16 grid grid-cols-1 gap-4 px-4">
        <Link href="/address/create" className="w-full text-center p-4 text-2xl bg-green-500">Добавяне на адрес</Link>
        {ADDRESSES.map(address => <Address key={address.id} address={address} />)}
    </div>);
}
