import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={clsx(
        'bg-white rounded-xl border border-slate-200 shadow-sm',
        className
      )}
      {...(hover ? motionProps : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('px-6 py-4 border-b border-slate-200', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={clsx('font-semibold text-slate-900', className)} {...props}>
      {children}
    </h3>
  );
}
