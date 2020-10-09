import _ from 'lodash';
import Link from 'next/link';
import { connect } from 'react-redux';
import { GetServerSideProps } from 'next';
import { wrapper } from '../redux/store';
import { InitialState, setServerPostsAC } from '../redux/post-reducer';
import { PostsAPI } from '../api/posts';
import Post from '../components/Post';
import { PostType } from '../interfaces'




type IndexPageProps = Pick<InitialState, 'posts'>;

const IndexPage = (props: IndexPageProps) => {

	return (
		<>

			<p>
				<Link href="/posts/new">
					<a>Create new post</a>
				</Link>
			</p>
			{
				!props.posts? <div>Loading...</div> :
                    <div>
						{
							_.map(props.posts, (post: PostType) => <Post key={post.id} post={post}/>)
						}
					</div>

			}

		</>

	);
};


const mapStateToProps = (state: InitialState) => {
	return {
		posts: state.posts
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

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
