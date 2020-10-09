import { GetServerSideProps } from 'next';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { wrapper } from '../../redux/store';
import {setServerPostAC, InitialState, addComment} from '../../redux/post-reducer';
import { PostsAPI } from '../../api/posts';
import _ from 'lodash';
import Comment from "../../components/Comment";
import CreateComment from "../../components/CreateComment";
import Preloader from "../../components/Preloader";
import {useState} from "react";
import Router from "next/router";

type PostPageProps = Pick<InitialState, 'post'> &{
	addComment: typeof addComment
};

const PostPage = (props: PostPageProps) => {
	const { post } = props;
    const [inProgress, setInProgress] = useState(false);

	if (!post) {
		return <Layout/>
	}



    const onDeleteClick = async () => {
        if(!confirm('You sure?')) {
            return;
        }
        setInProgress(true);
        await PostsAPI.deletePost(post.id);
        setInProgress(false);
        Router.push('/')
    };


	return (
		<Layout>

			<h1>{post.title}</h1>
			<div>{post.body}</div>

            {inProgress?<Preloader/>:<></>}
			<button onClick={ onDeleteClick }>Delete this post</button>

			<CreateComment id={post.id} addComment={props.addComment}/>


			{
				_.map(post.comments, comment => <Comment key={comment.id} body={comment.body}/>)
			}


		</Layout>
	);
};

const mapStateToProps = (state: InitialState) => {
	return {
		post: state.post
	};
};

const mapDispatchToProps = {
   addComment
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
