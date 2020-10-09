import { useState } from 'react';
import { PostType } from '../interfaces';
import Preloader from './Preloader';
import { Button, Row, message, Input } from 'antd';

const { TextArea } = Input;

type CreateCommentProps = Pick<PostType, 'id'> & {
	addComment: Function
};

const CreateComment = (props: CreateCommentProps) => {

	const [ comment, changeComment ] = useState('');
	const [ inProgress, setInProgress ] = useState(false);


	const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeComment(e.target.value);
	};

	const onAddComment = async () => {
		if ( !comment ) {
			message.warning('Please enter your comment');
			return;
		}

		setInProgress(true);
		await props.addComment(props.id, comment);
		changeComment('');
		setInProgress(false);

	};

	if ( inProgress ) {
		return <Preloader/>;
	}


	return (
		<Row justify="end">
			<TextArea rows={4} onChange={onInputChange} value={comment}/>
			<Button type="primary" onClick={onAddComment} style={{ marginTop: 20 }}>Add comment</Button>
		</Row>
	);
};

export default CreateComment;