import { UUID } from "crypto";
import { ReactNode } from "react";
import { ProductType } from "@/components/Product";
import { ClientType } from "./Client";
import { AddressType } from "./Address";
import Link from "next/link";

export type OrderType = {
    id: UUID | null;
    client: ClientType;
    address: AddressType;
    deliveryDate: Date;
    orderedProducts: Array<OrderedProductType>;
    deliveredProducts: Array<DeliveredProductType>;
    priority: number;
};

export type OrderedProductType = {
    product: ProductType;
    amount: number;
}

export type DeliveredProductType = {
    product: ProductType;
    amount: number
}

export interface OrderProps {
    order: OrderType,
}

export default function Order({ order }: OrderProps): ReactNode {
    return (<div className="border-black border-solid border-2 p-4 grid grid-cols-1 gap-2">
        <div className="text-xl">{order.client.name}</div>
        <div>{order.address.address}</div>
        <div>{order.client.notes}</div>
        <Link href={`/order/id/${order.id}`} className="bg-green-500 text-center text-xl">Редактиране</Link>
    </div>);
}

export function OrderDelivery({ order }: OrderProps): ReactNode {
    return (<div className="border-black border-solid border-2 p-4 grid grid-cols-1 gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="grid grid-cols-1 gap-2">
                <div className="text-xl">{order.client.name}</div>
                <a target="_blank" className="text-lg" href={`http://maps.google.com/?q=${order.address.address}`}>{order.address.address}</a>
                <div className="text-lg">{order.client.notes}</div>
            </div>
            <div className="grid grid-cols-1 gap-2 border-black border-2 p-1">
                {order.deliveredProducts.map((dp, i) => <div key={`container-${i}`} className="grid grid-cols-3 gap-2 border-2 border-black border-solid">
                    <div key={`name-${i}`}>{dp.product.name}</div>
                    <div key={`amount-${i}`}>{dp.amount+" "+dp.product.unit}</div>
                    <div key={`total-${i}`}>{dp.amount * dp.product.pricePerUnit} лв.</div>
                </div>)}
                <div className="w-full text-center text-xl">
                    Общо: {order.deliveredProducts.map(dp => dp.amount * dp.product.pricePerUnit).reduce((p,a)=> p+a, 0)} лв.
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Link href={`/order/id/${order.id}`} className="bg-green-500 text-center text-xl">Редактиране</Link>
            <Link href={`tel:${order.client.telephone}`} className="bg-green-500 text-center text-xl">{order.client.telephone}</Link>
        </div>
    </div>);
}
