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
                transition
                hover:bg-accent
                rounded
                ">
            {label}
        </div>
    )
};

export default MenuItem;