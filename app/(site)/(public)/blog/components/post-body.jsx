import { MDXRemote } from 'next-mdx-remote/rsc';
import { MdxComponents } from './mdx-components';


const PostBody = ({
    children
}) => {

    return (
        <MDXRemote
            source={children}
            components={MdxComponents} />
    )
};
export default PostBody;