import React from "react";

type props = {
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    enterDown?: (bool: boolean) => void;
    placeholder?: string
}

export const Input = ({value, onChange, type, enterDown, placeholder}: props) => {
    const checkKey = (event: any) => {
        if (event.code === "Enter" && enterDown) {
            enterDown(true);
        }
    }
    return(
        <input
            placeholder={placeholder}
            type={type || 'text'}
            value={value}
            onKeyUp={(event) => checkKey(event)}
            onChange={onChange}/>
    )
}
