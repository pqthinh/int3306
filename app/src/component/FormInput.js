import React from "react";
import "./FormInput.css";

export const FormInput = ({
    type,
    name,
    min,
    placeholder,
    register,
    value,
    onChange,
    cols,
    rows,
    minLength,
    typeInput,
    typeWidth,
    label,
    required,
    error,
    touched,
    listOption,
    defaultValue,
}) => {
    let input;
    switch (typeInput) {
        case "select":
            input = (
                <select
                name={name}
                onChange={onChange}
                className={error && touched ? "input-form error" : "input-form"}
                >
                <option value="" disabled selected>
                    {placeholder}
                </option>
                {listOption &&
                    listOption.map((item) => (
                    <option value={item.code} key={item.code}>
                        {item.name}
                    </option>
                    ))}
                </select>
            );
            break;
        case "textaria":
            input = (
                <textarea
                name={name}
                cols={cols ? cols : "30"}
                rows={rows ? rows : "10"}
                placeholder={placeholder}
                minLength={minLength ? minLength : "20"}
                onChange={onChange}
                defaultValue={defaultValue}
                ></textarea>
            );
            break;
        default:
        input = (
            <input
                type={type ? type : "text"}
                name={name}
                min={min ? min : "1"}
                className={error && touched ? "input-form error" : "input-form"}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                ref={register}
            />
        );
    }
    return (
        <div className={`input ${typeWidth}`}>
        <label htmlFor={name}>
            {label} <span>{required && "*"}</span>
        </label>
        {input}
        {error && touched && <span>{error}</span>}
        </div>
    );
};
