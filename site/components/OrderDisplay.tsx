"use client"

import { ReactNode, useState } from "react"
import Order, { OrderType } from "./Order"

export type OrderDisplayProps = {
    orders: Array<OrderType>
}


export default function OrderDisplay({ orders }: OrderDisplayProps): ReactNode {
    const [date, setDate] = useState<Date | null>(null);
    return (<div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-10 gap-2">
            <input type="date" className="text-center text-2xl bg-slate-200 p-2 col-span-5 md:col-span-8"
                onChange={(v) => setDate(new Date(v.currentTarget.value))} />
            <button type="button" className="bg-green-500 rounded-md text-2xl col-span-5 md:col-span-2"
                onClick={()=>setDate(null)}>Нулиране</button>
        </div>
        {orders.filter(o => {
            if (date === null) return true;
            o.deliveryDate = new Date(o.deliveryDate);
            return o.deliveryDate.getFullYear() == date.getFullYear()
                && o.deliveryDate.getMonth() == date.getMonth()
                && o.deliveryDate.getDate() == date.getDate();
        }).map(order => <Order key={order.id} order={order} />)}
    </div>)
}
