"use client"

import { ReactNode, useState } from "react";
import { ClientType } from "./Client";
import { OrderType } from "./Order";

export type ClientAddressSelectionProps = {
    clients: Array<ClientType>;
    currentOrder: OrderType | null
};

export default function ClientAddressSelection({clients, currentOrder = null} : ClientAddressSelectionProps) : ReactNode {
    const [client, setClient] = useState<ClientType | null>(currentOrder ? currentOrder.client : null)
    return (<div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4 md:gap-2">
            <select name="order_client_id" required onChange={(e) => setClient(clients.filter(c => c.id === e.currentTarget.value)[0])} defaultValue={currentOrder?.client.id?.toString()}>
                <option value="">Избери клиент</option>
                {clients.map(client => <option key={client.id?.toString()} value={`${client.id}`}>{client.name}</option>)}
            </select>
            <select name="order_address_id" required defaultValue={currentOrder?.address.id?.toString()}>
                <option value="">Избери адрес</option>
                {client?.addresses.map(ca=>ca.address).map(address => <option key={address.id?.toString()} value={`${address.id}`}>{address.address}</option>)}
            </select>
    </div>);
}
