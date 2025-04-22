"use client"
import { ReactNode, useState } from "react";
import { AddressType } from "./Address";

export interface AddressArrayInputProps {
    countName: string;
    fieldString: string;
    fieldName: string;
    data: Array<AddressType>;
    startingInputs: Array<AddressType>;
}

export function AddressArrayInput({ countName, fieldString, fieldName, data, startingInputs = new Array<AddressType>(1) }: AddressArrayInputProps): ReactNode {
    const [inputs, setInputs] = useState<Array<ReactNode>>(new Array<ReactNode>(startingInputs.length));
    const [inputIds, setIds] = useState<Array<string>>(new Array<string>(...(startingInputs.map(op=>op.id === null ? "new" : op.id.toString()))));
    for (let i = 0; i < inputs.length; i++) {
        inputs[i]=(<div className="grid grid-cols-2 col-span-2 gap-4 border-black border-solid border-2" key={`${fieldName}-container-${i}`}>
            <label key={`${fieldName}-label-${i}`}>{`${fieldString} ${i + 1}`}</label>
            <select key={`${fieldName}-${i}`} name={`${fieldName}_${i}`} required value={inputIds[i]} data-index={i} onChange={(e)=>{
                let index: number = new Number(e.currentTarget.getAttribute("data-index")) as number;
                inputIds[index] = e.currentTarget.value;
                setInputs(new Array<ReactNode>(...inputs));
                setIds(new Array<string>(...inputIds));
            }}>
                <option key={`${fieldName}-${i}-none`} value="new">Нов Адрес</option>
                {data.map(address => <option key={`${fieldName}-${i}-${address.id}`} value={address.id?.toString()} >{address.address}</option>)}
            </select>
            <label key={`${fieldName}-quantl-${i}`}>Адрес</label>
            <input className="bg-slate-100" required value={startingInputs.length > i ? startingInputs[i].address : ""} onChange={()=>{}}
                key={`${fieldName}_address_${i}`} type="text" step={0.01} name={`${fieldName}_${i}_address`} />
            <button data-index={i} className="bg-green-500 rounded-md text-lg p-1" type="button" onClick={(e)=>{
                let index: number = new Number(e.currentTarget.getAttribute("data-index")) as number;
                inputs.splice(index, 1);
                inputIds.splice(index, 1);
                setInputs(new Array<ReactNode>(...inputs));
                setIds(new Array<string>(...inputIds));}}>Премахни</button>
        </div>);
    }
    return (<div className="grid grid-cols-2 gap-2 col-span-2">
        <button className="bg-green-500 rounded-md text-lg p-1" onClick={() => {setInputs(new Array<ReactNode>(inputs.length + 1)); inputIds.push("new"); setIds(new Array<string>(...inputIds));}} type="button">Добави Адрес</button>
        <button className="bg-green-500 rounded-md text-lg p-1" onClick={() => {setInputs(new Array<ReactNode>(Math.max(inputs.length - 1, 0))); inputIds.pop(); setIds(new Array<string>(...inputIds));}} type="button">Премахни Последен Адрес</button>
        <input type="number" step={1} name={countName} value={inputs.length} readOnly hidden />
        {inputs}
    </div>);
}
