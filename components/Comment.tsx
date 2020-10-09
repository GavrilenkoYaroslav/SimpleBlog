import { CommentType } from '../interfaces';
import { Comment as AComment, Avatar } from 'antd';

type CommentProps = Pick<CommentType, 'body'>;

const Comment = (props: CommentProps) => {
	return (
		<>
			<AComment
				author={<a>Han Solo</a>}
				avatar={
					<Avatar
						src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						alt="Han Solo"
					/>
				}
				content={
					<p>
						{props.body}
					</p>
				}
			/>
		</>
	);
};

export default Comment;