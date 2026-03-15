import styles from './Input.module.scss';
import type {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = ({label, id, className = '', ...props}: InputProps) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <input id={id} className={`${styles.input} ${className}`} {...props}/>
        </div>
    );
};

export default Input;