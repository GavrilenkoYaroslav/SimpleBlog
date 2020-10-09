/*external modules*/
import { GetServerSideProps } from 'next';
import { connect } from 'react-redux';
/**/
import Layout from '../../components/Layout';
import { wrapper } from '../../redux/store';
import { setServerPostAC, InitialState } from '../../redux/post-reducer';
import { PostsAPI } from '../../api/posts';
import _ from 'lodash';

type PostPageProps = Pick<InitialState, 'post'>;

const PostPage = (props: PostPageProps) => {
	const { post } = props;

	return (
		<Layout>
			<h1>{post?.title}</h1>
			<div>{post?.body}</div>
			<div>
				<input type="text"/>
				<button>Add comment</button>
			</div>
			<div>Comments:</div>
			{
				_.map(post?.comments, comment => {
					return <div>{comment.body}</div>; // replace with component
				})
			}
		</Layout>
	);
};

const mapStateToProps = (state: InitialState) => {
	return { post: state.post };
};

export default connect(mapStateToProps)(PostPage);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
	async ({ store, query }) => {
		const postId = query.id as string;

		try {
			const post = await PostsAPI.getPost(postId);
			store.dispatch(setServerPostAC(post));
		} catch ( e ) {
			console.error(e);
		}

	},
);
