import {useState} from "react";
import {PostType} from "../interfaces";
import Preloader from "./Preloader";


type CreateCommentProps = Pick<PostType, 'id'> & {
    addComment: any
};

const CreateComment = (props: CreateCommentProps) => {

    const [comment, changeComment] = useState('');
    const [inProgress, setInProgress] = useState(false);


    const onInputChange = (e: any) => {
        changeComment(e.target.value)
    };

    const onAddComment = async () => {
        if (!comment) {
            alert('Please enter your comment');
            return;
        }

        setInProgress(true);

        await props.addComment(props.id, comment);
        changeComment('');
        setInProgress(false);

    };

    if (inProgress) {
        return <Preloader/>
    }


    return (
        <>

            <input onChange={onInputChange} value={comment}/>

            <button onClick={onAddComment}>Add comment</button>

        </>
    );
};

export default CreateComment;