import React from 'react';
import './TextArea.css';

type TextAreaProps = {
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({value, onChange}: TextAreaProps) => {
    return (
        <textarea value={value} onChange={onChange} rows={10} cols={50}/>
    )
}