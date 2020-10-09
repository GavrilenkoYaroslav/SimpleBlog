import _ from 'lodash';
import Link from 'next/link';
import { connect } from 'react-redux';
import { GetServerSideProps } from 'next';
import { wrapper } from '../redux/store';
import { InitialState, setServerPostsAC } from '../redux/post-reducer';
import { PostsAPI } from '../api/posts';
import { useRouter } from 'next/router';
import Post from '../components/Post';
import { PostType } from '../interfaces';

type IndexPageProps = Pick<InitialState, 'posts' | 'inProgress'>;

const IndexPage = (props: IndexPageProps) => {

	const postsPerPage = 10;
	const router = useRouter();
	const page = Number(router.query.page) || 1;

	const start = postsPerPage * (page - 1);
	const end = start + postsPerPage;

	// _.chain(props.posts).slice(start,end).map(()=>{}).value()

	return (
		<>
			<p>
				<Link href="/posts/new">
					<a>Create new post</a>
				</Link>
			</p>
			{
				props.inProgress
					? <div>Loading...</div>
					: <div>
						{
							_.map(_.slice(props.posts, start, end), (post: PostType) => <Post key={post.id} post={post}/>)
						}
					</div>
			}

		</>

	);
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
	async ({ store }) => {

		try {
			const posts = await PostsAPI.getPosts();
			store.dispatch(setServerPostsAC(posts.reverse()));
		} catch ( e ) {
			console.error(e);
		}

	},
);

const mapStateToProps = (state: InitialState) => {
	return {
		posts: state.posts,
		inProgress: state.inProgress,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
