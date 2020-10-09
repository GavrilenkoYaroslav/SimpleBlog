import {CommentType} from "../interfaces";

type CommentProps = Pick<CommentType, 'body'>;

const Comment = (props:CommentProps) => {
    return (
        <>
            <div>Comment:</div>
            <div>{props.body}</div>

        </>
    );

};

export default Comment;