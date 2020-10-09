import {useState} from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { addPost } from '../../redux/post-reducer';
import Preloader from "../../components/Preloader";

type NewPostPageProps =  {
	addPost: typeof addPost,
};

const NewPostPage = (props: NewPostPageProps) => {

	const [ postData, setPostData ] = useState('');
	const [ titleData, setTitleData ] = useState('');
	const [ inProgress, setInProgress] = useState(false);

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
		setInProgress(true);
		await props.addPost(titleData, postData);
		setInProgress(false);
		setTitleData('');
		setPostData('');

	};

	return (
		<Layout>

			{inProgress ? <Preloader/>: <>

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


const mapStateToProps = () => {
	return {};
};


const mapDispatchToProps = {
	addPost,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewPostPage);
