import Link from 'next/link';
import { InitialState } from '../redux/post-reducer';

type PostProps = Pick<InitialState, 'post'>;

const Post = (props: PostProps) => {
	const { post } = props;

	if ( !post ) {
		return null;
	}

	return (
		<>
			<Link href={`/posts/${post.id}`}>
				<a>
					<h1>{post.title}</h1>
				</a>
			</Link>
			<div>{post.body}</div>
		</>
	);
};

export default Post;