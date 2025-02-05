import Link from "next/link";
import { ReactNode } from "react";

export default function Header() : ReactNode {
    return (<div className="fixed z-10 items-center w-full grid grid-cols-5 py-4 bg-green-200 dark:bg-green-900">
        <Link href="/client" className="text-center">Клиенти</Link>
        <Link href="/order" className="text-center">Поръчки</Link>
        <Link href="/product" className="text-center">Продукти</Link>
        <Link href="/address" className="text-center">Адреси</Link>
        <Link href="/delivery" className="text-center">Разнос</Link>
    </div>);
}
