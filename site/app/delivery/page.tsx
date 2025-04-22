export const dynamic = 'force-dynamic'
import { OrderDelivery, OrderType } from "@/components/Order";
import { ReactNode } from "react";


export default async function ClientPage(): Promise<ReactNode> {
    const ORDERS: Array<OrderType> = new Array<OrderType>();
    await fetch(process.env.API_SERVER + "/order/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        const today: Date = new Date(Date.now());
        ORDERS.push(...((json) as Array<OrderType>).filter(o => {
            o.deliveryDate = new Date(o.deliveryDate);
            return o.deliveryDate.getMonth() == today.getMonth()
                && o.deliveryDate.getDate() == today.getDate()
                && o.deliveryDate.getFullYear() == today.getFullYear()}));
    });
    return (<div className="pt-16 grid grid-cols-1 gap-4 px-4">
        {ORDERS.map(order => <OrderDelivery key={order.id} order={order} />)}
    </div>);
}
