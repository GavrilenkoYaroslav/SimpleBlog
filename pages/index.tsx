import _ from 'lodash';
import { connect } from 'react-redux';
import { GetServerSideProps } from 'next';
import { wrapper } from '../redux/store';
import { InitialState, setServerPostsAC } from '../redux/post-reducer';
import { PostsAPI } from '../api/posts';
import Post from '../components/Post';
import { PostType } from '../interfaces';
import { Row, Col, Button } from 'antd';
import Router from 'next/router';


type IndexPageProps = Pick<InitialState, 'posts'>;

const IndexPage = (props: IndexPageProps) => {

	return (
		<>

			<Row style={{ marginTop: 20 }}>
				<Col span={12} offset={6}>
					<Button onClick={() => {
						Router.push('/posts/new');
					}} size={'large'} block>
						Create new post
					</Button>
				</Col>
			</Row>
			{
				!props.posts ? <div>Loading...</div> :
					<Row>
						{_.map(props.posts, (post: PostType) => <Col span={6} style={{ marginTop: 20 }}>
							<Row justify="center"><Post key={post.id} post={post}/></Row>
						</Col>)
						}
					</Row>
			}

		</>

	);
};


const mapStateToProps = (state: InitialState) => {
	return {
		posts: state.posts,
	};
};

export default connect(mapStateToProps)(IndexPage);

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
