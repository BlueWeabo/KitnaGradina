import { UUID } from "crypto";
import Link from "next/link";
import { ReactNode } from "react";

export type ProductType = {
    id: UUID | null;
    name: string;
    unit: string;
    pricePerUnit: number;
}

export interface ProductProps {
    product: ProductType
}

export default function Product({ product } : ProductProps) : ReactNode {
    return (<div className="border-black border-solid border-2 p-4 grid grid-cols-1 gap-2">
        <div className="text-xl">{product.name}</div>
        <div>{product.pricePerUnit}лв/{product.unit}</div>
        <Link href={`/product/id/${product.id}`} className="bg-green-500 text-center text-xl">Редактиране</Link>
    </div>);
}
