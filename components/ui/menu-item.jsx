'use client'

const MenuItem = ({ onClick, label, onMouseEnter }) => {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            className="
                px-4
                py-3
                cursor-pointer
                hover:bg-neutral-100
                transition
                ">
            {label}
        </div>
    )
};

export default MenuItem;