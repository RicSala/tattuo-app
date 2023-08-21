const Heading2 = ({ children }) => {
    const idText = children.replace(/ /g, '_').toLowerCase();

    return <h2 id={idText}>{children}</h2>;
};

export { Heading2 };