export const dynamic = 'force-dynamic'
import { ProductType } from "@/components/Product";
import { UUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function EditProduct({ params }: { params: Promise<{ product_id: UUID }> }): Promise<ReactNode> {
    const product_id = (await params).product_id;
    const PRODUCT: ProductType = await fetch(process.env.API_SERVER + "/product/id/" + product_id, {
        method: "GET",
        headers: {
            "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
        },
    }).then(data => data.json());
    async function editProduct(formData: FormData) {
        "use server";
        const id = formData.get("id");
        const product_name = formData.get("product_name");
        const product_unit = formData.get("product_unit");
        const product_price = formData.get("product_price");
        if (id === null || product_name === null || product_unit === null || product_price === null) {
            return;
        }
        const product: ProductType = {
            id: id.toString() as UUID,
            name: product_name.toString(),
            unit: product_unit.toString(),
            pricePerUnit: Number(product_price.toString())
        }
        const request: Request = new Request(process.env.API_SERVER + "/product/save", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/product");
    }
    async function deleteProduct(formData: FormData) {
        "use server"
        const id = formData.get("id");
        const product_name = formData.get("product_name");
        const product_unit = formData.get("product_unit");
        const product_price = formData.get("product_price");
        if (id === null || product_name === null || product_unit === null || product_price === null) {
            return;
        }
        const product: ProductType = {
            id: id.toString() as UUID,
            name: product_name.toString(),
            unit: product_unit.toString(),
            pricePerUnit: Number(product_price.toString())
        }
        const request: Request = new Request(process.env.API_SERVER + "/product/delete", {
            method: "DELETE",
            body: JSON.stringify(product),
            headers: {
                "KG-API-KEY": process.env.API_KEY ? process.env.API_KEY : "",
                "Content-type": "application/json",
            },
        });
        await fetch(request);
        redirect("/product");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Редактиране на продукт</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={editProduct}>
            <label>Име</label>
            <input type="text" name="product_name" required defaultValue={PRODUCT.name} />
            <label>Мярка</label>
            <input type="text" name="product_unit" required defaultValue={PRODUCT.unit} />
            <label>Цена за мярка</label>
            <input type="number" step={0.01} name="product_price" required defaultValue={PRODUCT.pricePerUnit} />
            <Link href="/product" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl text-center">Назад</Link>
            <button type="submit" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl">Запази</button>
            <input type="text" name="id" hidden defaultValue={product_id} />
        </form>
        <form className="grid grid-cols-2 col-span-2" action={deleteProduct} >
            <input type="text" name="product_name" required defaultValue={PRODUCT.name} hidden/>
            <input type="text" name="product_unit" required defaultValue={PRODUCT.unit} hidden/>
            <input type="number" step={0.01} name="product_price" required defaultValue={PRODUCT.pricePerUnit} hidden/>
            <input type="text" name="id" hidden defaultValue={product_id} />
            <button type="submit" className="bg-green-200 dark:bg-green-900 rounded-md m-4 text-2xl">Запази</button>
        </form>
    </div>);
}
