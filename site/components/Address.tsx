import { UUID } from "crypto"
import Link from "next/link";
import { ReactNode } from "react";

export type AddressType = {
    id: UUID | null;
    address: string;
}

export interface AddressProps {
    address: AddressType;
}

export default function Address({ address } : AddressProps) : ReactNode {
    return (<div className="border-black border-solid border-2 p-4 grid grid-cols-1 gap-2">
        <div className="text-xl">{address.address}</div>
        <Link href={`/address/id/${address.id}`} className="bg-green-500 text-center text-xl">Редактиране</Link>
    </div>);
}
