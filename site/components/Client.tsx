import { UUID } from "crypto";
import Link from "next/link";
import { ReactNode } from "react";
import { AddressType } from "./Address";

export type ClientType = {
    id: UUID | null;
    name: string;
    telephone: string;
    notes: string;
    addresses: Array<{address: AddressType}>;
}

export interface ClientProps {
    client: ClientType;
}

export default function Client({ client } : ClientProps) :ReactNode {
    return (<div className="border-black border-solid border-2 p-4 grid grid-cols-1 gap-2">
        <div className="text-xl">{client.name}</div>
        <div>{client.telephone}</div>
        <div>{client.notes}</div>
        <Link href={`/client/id/${client.id}`} className="bg-green-500 text-center text-xl">Редактиране</Link>
    </div>);
}
