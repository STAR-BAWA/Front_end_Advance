import React from 'react'

const Button = ({ id, title, leftIcon, rightIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black flex items-center gap-2 tranform duration-300 ease-out hover:scale-115 ${containerClass}`}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {title}
      </span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}

export default Button
