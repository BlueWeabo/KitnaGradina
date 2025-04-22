export const dynamic = 'force-dynamic'
import Product, { ProductType } from "@/components/Product";
import Link from "next/link";
import { ReactNode } from "react";


export default async function ProductPage(): Promise<ReactNode> {
    const PRODUCTS: Array<ProductType> = new Array<ProductType>();
    await fetch(process.env.API_SERVER + "/product/all", {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        }
    }).then(data => data.json()).then(json => {
        PRODUCTS.push(...json);
    });
    return (<div className="pt-16 grid grid-cols-1 gap-4 px-4">
        <Link href="/product/create" className="w-full text-center p-4 text-2xl bg-green-500">Добавяне на продукт</Link>
        {PRODUCTS.map(product => <Product key={product.id} product={product} />)}
    </div>);
}
