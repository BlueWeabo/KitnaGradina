"use client"
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function Header() : ReactNode {
    const [state, setState] = useState(false);

    return (<div className={"fixed z-10 items-center w-full md:grid md:grid-cols-5 py-4 px-2 bg-green-500 " + (state ? "grid grid-cols-1 gap-2" : "")}>
        <button className="text-center text-xl md:hidden rounded-md bg-green-700 p-1 px-4 w-full" onClick={()=>setState(!state)}>Menu</button>
        <Link href="/client" className={"text-center text-xl md:visible " + (state ? "visible" : "hidden")}>Клиенти</Link>
        <Link href="/order" className={"text-center text-xl md:visible " + (state ? "visible" : "hidden")}>Поръчки</Link>
        <Link href="/product" className={"text-center text-xl md:visible " + (state ? "visible" : "hidden")}>Продукти</Link>
        <Link href="/address" className={"text-center text-xl md:visible " + (state ? "visible" : "hidden")}>Адреси</Link>
        <Link href="/delivery" className={"text-center text-xl md:visible " + (state ? "visible" : "hidden")}>Разнос</Link>

    </div>);
}
