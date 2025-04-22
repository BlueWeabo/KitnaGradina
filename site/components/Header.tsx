import Link from "next/link";
import { ReactNode } from "react";

export default function Header() : ReactNode {
    return (<div className="fixed z-10 items-center w-full grid grid-cols-5 py-4 bg-green-200 dark:bg-green-500">
        <Link href="/client" className="text-center text-xl">Клиенти</Link>
        <Link href="/order" className="text-center text-xl">Поръчки</Link>
        <Link href="/product" className="text-center text-xl">Продукти</Link>
        <Link href="/address" className="text-center text-xl">Адреси</Link>
        <Link href="/delivery" className="text-center text-xl">Разнос</Link>
    </div>);
}
