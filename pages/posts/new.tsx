import React, { useState } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { addPost } from '../../redux/post-reducer';
import Preloader from '../../components/Preloader';
import { message, Input, Button, Row, Col } from 'antd';

const { TextArea } = Input;

type NewPostPageProps = {
	addPost: Function
};

const NewPostPage = (props: NewPostPageProps) => {

	const [ postData, setPostData ] = useState('');
	const [ titleData, setTitleData ] = useState('');
	const [ inProgress, setInProgress ] = useState(false);

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitleData(e.target.value);
	};

	const onChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPostData(e.target.value);
	};

	const onClickButton = async () => {
		if ( !titleData ) {
			message.warning('Please enter title');
			return;
		}

		if ( !postData ) {
			message.warning('Please enter post message');
			return;
		}
		setInProgress(true);
		await props.addPost(titleData, postData);
		setInProgress(false);
		setTitleData('');
		setPostData('');

	};

	return (
		<>
			<Button onClick={() => {
				Router.push('/');
			}} type="primary" style={{ margin: 20 }}>Go to all posts</Button>

			{inProgress ? <Row>
				<Col span={24} offset={12}>
					<Preloader/>
				</Col>
			</Row> : <></>}

			<Row>
				<Col span={12} offset={6}>

					<Row>
						<Col span={24}>
							<div>
								<Input placeholder={'Enter title'} onChange={onChangeTitle} value={titleData}/>
							</div>

							<TextArea placeholder={'Your post'} onChange={onChangePost} value={postData} rows={4}/>

							<Row justify={'end'}>
								<Button onClick={onClickButton} type="primary" style={{ marginTop: 20 }}>Add post</Button>
							</Row>
						</Col>
					</Row>

				</Col>
			</Row>

		</>
	);
};


const mapDispatchToProps = {
	addPost,
};


export default connect(null, mapDispatchToProps)(NewPostPage);
