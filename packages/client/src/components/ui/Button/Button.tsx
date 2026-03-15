import styles from './Button.module.scss';
import type {ButtonHTMLAttributes, ReactNode} from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string
}

const Button = ({children, variant = 'primary', size = 'md', className='', ...props}: ButtonProps) => {
   const btnClasses = [styles.btn, styles[`btn--${variant}`], styles[`btn--${size}`], className].filter(Boolean).join(' ')

    return (
        <button className={btnClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;