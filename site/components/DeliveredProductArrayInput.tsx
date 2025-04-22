"use client"
import { ReactNode, useState } from "react";
import { ProductType } from "./Product";
import { DeliveredProductType } from "./Order";

export interface DeliveredProductArrayInputProps {
    countString: string;
    countName: string;
    fieldString: string;
    fieldName: string;
    data: Array<ProductType>;
    startingInputs: Array<DeliveredProductType>;
}

export function DeliveredProductArrayInput({ countName, fieldString, fieldName, data, startingInputs }: DeliveredProductArrayInputProps): ReactNode {
    const [inputs, setInputs] = useState<Array<ReactNode>>(new Array<ReactNode>(startingInputs.length));
    const [inputIds, setIds] = useState<Array<string>>(new Array<string>(...(startingInputs.map(op=>op.product.id === null ? "" : op.product.id.toString()))));
    for (let i = 0; i < inputs.length; i++) {
        inputs[i]=(<div className="grid grid-cols-2 col-span-2 gap-4 border-black border-solid border-2" key={`${fieldName}-container-${i}`}>
            <label key={`${fieldName}-label-${i}`}>{`${fieldString} ${i + 1}`}</label>
            <select key={`${fieldName}-${i}`} name={`${fieldName}_${i}`} required value={inputIds[i]} data-index={i} onChange={(e)=>{
                let index: number = new Number(e.currentTarget.getAttribute("data-index")) as number;
                inputIds[index] = e.currentTarget.value;
                setInputs(new Array<ReactNode>(...inputs));
                setIds(new Array<string>(...inputIds));
            }}>
                <option key={`${fieldName}-${i}-none`} value="">Избери продукт</option>
                {data.map(product => <option key={`${fieldName}-${i}-${product.id}`} value={product.id?.toString()} >{product.name}</option>)}
            </select>
            <label key={`${fieldName}-quantl-${i}`}>Количество</label>
            <input className="bg-slate-100" required
                key={`${fieldName}_amount_${i}`} type="number" step={0.01} name={`${fieldName}_${i}_amount`} />
            <button data-index={i} className="bg-green-500 rounded-md text-lg p-1" type="button" onClick={(e)=>{
                let index: number = new Number(e.currentTarget.getAttribute("data-index")) as number;
                inputs.splice(index, 1);
                inputIds.splice(index, 1);
                setInputs(new Array<ReactNode>(...inputs));
                setIds(new Array<string>(...inputIds));}}>Премахни</button>
        </div>);
    }
    return (<div className="grid grid-cols-2 gap-2">
        <button className="bg-green-500 rounded-md text-lg p-1" onClick={() => {setInputs(new Array<ReactNode>(inputs.length + 1)); inputIds.push(""); setIds(new Array<string>(...inputIds));}} type="button">Добави поръчан продукт</button>
        <button className="bg-green-500 rounded-md text-lg p-1" onClick={() => {setInputs(new Array<ReactNode>(inputs.length - 1)); inputIds.pop(); setIds(new Array<string>(...inputIds));}} type="button">Премахни поръчан продукт</button>
        <input type="number" step={1} name={countName} value={inputs.length} readOnly hidden />
        {inputs}
    </div>);
}
