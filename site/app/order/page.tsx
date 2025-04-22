export const dynamic = 'force-dynamic'
import { OrderType } from "@/components/Order";
import OrderDisplay from "@/components/OrderDisplay";
import Link from "next/link";
import { ReactNode } from "react";


export default async function ClientPage(): Promise<ReactNode> {
    const ORDERS: Array<OrderType> = new Array<OrderType>();
    await fetch(process.env.API_SERVER + "/order/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        ORDERS.push(...json);
    });
    return (<div className="pt-16 grid grid-cols-1 gap-4 px-4">
        <Link href="/order/create" className="w-full text-center p-4 text-2xl bg-green-500">Добавяне на поръчка</Link>
        <OrderDisplay orders={ORDERS} />
    </div>);
}
