import { useState } from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { addPost, InitialState } from '../../redux/post-reducer';

type NewPostPageProps = Pick<InitialState, 'inProgress'> & {
	addPost: typeof addPost,
};

const NewPostPage = (props: NewPostPageProps) => {

	const [ postData, setPostData ] = useState('');
	const [ titleData, setTitleData ] = useState('');

	const onChangeTitle = (e: any) => {
		setTitleData(e.target.value);
	};

	const onChangePost = (e: any) => {
		setPostData(e.target.value);
	};

	const onClickButton = async () => {
		if ( !titleData ) {
			alert('Please enter title');
			return;
		}

		if ( !postData ) {
			alert('Please enter post message');
			return;
		}
		props.addPost(titleData, postData);
		setTitleData('');
		setPostData('');

	};

	return (
		<Layout>

			{props.inProgress ? <div>Loading...</div> : <>

				<div>
					<input placeholder={'Enter title'} onChange={onChangeTitle} value={titleData}/>
				</div>

				<div>
					<textarea placeholder={'Your post'} onChange={onChangePost} value={postData}/>
				</div>

				<div>
					<button onClick={onClickButton}>click</button>
				</div>
			</>
			}

		</Layout>
	);
};

const mapStateToProps = (state: InitialState) => {
	return {
		inProgress: state.inProgress,
	};
};


const mapDispatchToProps = {
	addPost,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewPostPage);
