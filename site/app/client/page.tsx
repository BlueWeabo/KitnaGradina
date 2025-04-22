export const dynamic = 'force-dynamic'
import Client, { ClientType } from "@/components/Client";
import Link from "next/link";
import { ReactNode } from "react";


export default async function ClientPage(): Promise<ReactNode> {
    const CLIENTS: Array<ClientType> = new Array<ClientType>();
    await fetch(process.env.API_SERVER + "/client/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        CLIENTS.push(...json);
    });
    return (<div className="pt-16 grid grid-cols-1 gap-4 px-4">
        <Link href="/client/create" className="w-full text-center p-4 text-2xl bg-green-500">Добавяне на клиент</Link>
        {CLIENTS.map(client => <Client key={client.id} client={client} />)}
    </div>);
}
