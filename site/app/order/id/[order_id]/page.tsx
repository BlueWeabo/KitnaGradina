export const dynamic = 'force-dynamic'
import { AddressType } from "@/components/Address";
import { ClientType } from "@/components/Client";
import ClientAddressSelection from "@/components/ClientAddressSelection";
import { DeliveredProductArrayInput } from "@/components/DeliveredProductArrayInput";
import { DeliveredProductType, OrderedProductType, OrderType } from "@/components/Order";
import OrderedProductArrayInput from "@/components/OrderedProductArrayInput";
import { ProductType } from "@/components/Product";
import { UUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function EditOrder({ params }: { params: Promise<{ order_id: string }> }): Promise<ReactNode> {
    const order_id = (await params).order_id;
    const ORDER: OrderType = await fetch(process.env.API_SERVER + "/order/id/" + order_id, {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        },
    }).then(data => data.json());
    ORDER.deliveryDate = new Date(ORDER.deliveryDate);
    const CLIENTS: Array<ClientType> = new Array<ClientType>();
    await fetch(process.env.API_SERVER + "/client/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        CLIENTS.push(...json);
    });
    const ADDRESSES: Array<AddressType> = new Array<AddressType>();
    await fetch(process.env.API_SERVER + "/address/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        ADDRESSES.push(...json);
    });
    const PRODUCTS: Array<ProductType> = new Array<ProductType>();
    await fetch(process.env.API_SERVER + "/product/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        PRODUCTS.push(...json);
    });
    async function editOrder(formData: FormData) {
        "use server";
        const order_id = formData.get("order_id");
        const order_client_id = formData.get("order_client_id");
        const order_address_id = formData.get("order_address_id");
        const order_date = formData.get("order_date");
        const order_ordered_product_count = formData.get("order_ordered_product_count");
        if (order_id == null || order_client_id === null || order_address_id === null || order_ordered_product_count === null || order_date === null) {
            return;
        }
        const order_ordered_products: Array<OrderedProductType> = new Array<OrderedProductType>();
        const loop = new Number(order_ordered_product_count.toString());
        for (let i = 0; i < (loop as number); i++) {
            const product_id = formData.get(`order_ordered_product_${i}`);
            if (product_id === null) continue;
            const product: ProductType = await fetch(process.env.API_SERVER + "/product/id/" + product_id.toString(), {
                method: "GET",
                headers: {
                    "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                }
            }).then(data => data.json());
            const product_amount = formData.get(`order_ordered_product_${i}_amount`);
            if (product_amount === null) continue;
            const ordered_product: OrderedProductType = {
                product: product,
                amount: new Number(product_amount.toString()) as number
            }
            order_ordered_products.push(ordered_product);
        }
        if (order_ordered_products.length == 0) return;
        const order_delivered_product_count = formData.get("order_delivered_product_count");
        if (order_delivered_product_count === null) {
            return;
        }
        const order_delivered_products: Array<DeliveredProductType> = new Array<DeliveredProductType>();
        const loopD = new Number(order_ordered_product_count.toString());
        for (let i = 0; i < (loopD as number); i++) {
            const product_id = formData.get(`order_delivered_product_${i}`);
            if (product_id === null) continue;
            const product: ProductType = await fetch(process.env.API_SERVER + "/product/id/" + product_id.toString(), {
                method: "GET",
                headers: {
                    "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                }
            }).then(data => data.json());
            const product_amount = formData.get(`order_delivered_product_${i}_amount`);
            if (product_amount === null) continue;
            const delivered_product: DeliveredProductType = {
                product: product,
                amount: new Number(product_amount.toString()) as number
            }
            order_delivered_products.push(delivered_product);
        }
        const order_client: ClientType = await fetch(process.env.API_SERVER + "/client/id/" + order_client_id, {
            method: "GET",
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
            }
        }).then(data => data.json());
        const order_address: AddressType = await fetch(process.env.API_SERVER + "/address/id/" + order_address_id, {
            method: "GET",
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
            }
        }).then(data => data.json());
        const order: OrderType = {
            id: (order_id.toString()) as UUID,
            client: order_client,
            address: order_address,
            deliveredProducts: order_delivered_products,
            orderedProducts: order_ordered_products,
            deliveryDate: new Date(order_date.toString())
        }
        const request: Request = new Request(process.env.API_SERVER + "/order/save", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/order");
    }
    async function deleteOrder(formData: FormData) {
        "use server"
        const id = formData.get("order_id");
        if (id === null) {
            return;
        }
        const order = {
            id: id.toString() as UUID,
        }
        const request: Request = new Request(process.env.API_SERVER + "/order/delete", {
            method: "DELETE",
            body: JSON.stringify(order),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/order");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Редактиране на поръчка</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={editOrder}>
            <input type="text" hidden defaultValue={order_id} name="order_id" />
            <ClientAddressSelection clients={CLIENTS} currentOrder={ORDER}/>
            <input type="date" name="order_date" className="text-center bg-slate-100 col-span-2" defaultValue={ORDER.deliveryDate.toJSON().split('T')[0]} required/>
            <div>
                <OrderedProductArrayInput countName="order_ordered_product_count" fieldString="Поръчан Продукт" fieldName="order_ordered_product" data={PRODUCTS} startingInputs={ORDER.orderedProducts}  countString="Брой Поръчани Продукти"/>
            </div>
            <div>
                <DeliveredProductArrayInput countName="order_delivered_product_count" fieldString="Доставен Продукт" fieldName="order_delivered_product" data={PRODUCTS} startingInputs={ORDER.deliveredProducts} countString="Брой Доставени Продукти"/>
            </div>
            <Link href="/order" className="bg-green-500 rounded-md m-4 text-2xl text-center">Назад</Link>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Запази</button>
        </form>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={deleteOrder}>
            <input type="text" hidden defaultValue={order_id} name="order_id" />
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Изтрий</button>
        </form>
    </div>);
}
