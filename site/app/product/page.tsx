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
        console.log(json);
        PRODUCTS.push(...json);
    });
    return (<div className="pt-20 grid grid-cols-1 gap-4">
        <div className="bg-green-500 w-full p-4 text-center text-2xl"><Link href="/product/create">Създаване на продукт</Link></div>
        {PRODUCTS.map(product => <Product key={product.id} product={product} />)}
    </div>);
}
