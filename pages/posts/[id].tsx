import { GetServerSideProps } from 'next';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';
import { setServerPostAC, InitialState, addComment } from '../../redux/post-reducer';
import { PostsAPI } from '../../api/posts';
import _ from 'lodash';
import Comment from '../../components/Comment';
import CreateComment from '../../components/CreateComment';
import Preloader from '../../components/Preloader';
import { useState } from 'react';
import Router from 'next/router';
import { Row, Col, Card, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


type PostPageProps = Pick<InitialState, 'post'> & {
	addComment: Function
};

const PostPage = (props: PostPageProps) => {
	const { post } = props;
	const [ inProgress, setInProgress ] = useState(false);

	if ( !post ) {
		return <Preloader/>;
	}


	const onDeleteClick = async () => {
		confirm({
			title: 'Do you Want to delete this post?',
			icon: <ExclamationCircleOutlined/>,
			content: '',
			async onOk() {
				setInProgress(true);
				await PostsAPI.deletePost(post.id);
				setInProgress(false);
				Router.push('/');
			},
			onCancel() {
				return;
			},
		});

	};

	return (
		<>
			<Row justify={'center'} style={{ marginTop: 20 }}>
				<Col span={4}>
					<Button onClick={() => {
						Router.push('/');
					}} block>Go back</Button>
				</Col>
				<Col span={4}>
					<Button onClick={() => {
						Router.push('/posts/new');
					}} block>Create new post</Button>
				</Col>
			</Row>

			<Row>
				<Col span={12} offset={6}>
					<Card title={<h1>{post.title}</h1>} bordered={false}>
						<p>{post.body}</p>
					</Card>

					<Row justify="end">
						{inProgress ? <Preloader/> : <></>}
						<Button onClick={onDeleteClick} danger>Delete this post</Button>
					</Row>

					<Row>
						<Col span={24}>
							<h3>Comments:</h3>
							<CreateComment id={post.id} addComment={props.addComment}/>
							{
								_.map([ ...post.comments ].reverse(), comment => <Comment key={comment.id} body={comment.body}/>)
							}
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state: InitialState) => {
	return {
		post: state.post,
	};
};

const mapDispatchToProps = {
	addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);


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
