export const dynamic = 'force-dynamic'
import { ProductType } from "@/components/Product";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function CreateProduct(): ReactNode {
    async function createProduct(formData: FormData) {
        "use server";
        const product_name = formData.get("product_name");
        const product_unit = formData.get("product_unit");
        const product_price = formData.get("product_price");
        if (product_name === null || product_unit === null || product_price === null) {
            return;
        }
        const product: ProductType = {
            id: null,
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
        fetch(request);
        redirect("/product");
    }
    return (<div className="grid grid-cols-2 p-8">
        <div className="mt-12 col-span-2 text-center text-3xl">Creating Product</div>
        <form className="grid col-span-2 grid-cols-2 gap-4 mt-4" action={createProduct}>
            <label>Name</label>
            <input type="text" name="product_name" required />
            <label>Unit</label>
            <input type="text" name="product_unit" required />
            <label>Price</label>
            <input type="number" step={0.01} name="product_price" required />
            <button type="reset" className="bg-green-500 rounded-md m-4 text-2xl">Clear</button>
            <button type="submit" className="bg-green-500 rounded-md m-4 text-2xl">Save</button>
        </form>
    </div>);
}
