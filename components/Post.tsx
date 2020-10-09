import Link from 'next/link';
import { InitialState } from '../redux/post-reducer';
import { Card } from 'antd';

const { Meta } = Card;

type PostProps = Pick<InitialState, 'post'>;

const Post = (props: PostProps) => {
	const { post } = props;

	if ( !post ) {
		return null;
	}

	return (
		<>
			<Link href={`/posts/${post.id}`}>
				<Card
					hoverable
					style={{ width: 360 }}
					cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
				>
					<Meta title={post.title} description={post.body}/>
				</Card>
			</Link>
		</>
	);
};

export default Post;