import {HYDRATE} from "next-redux-wrapper";
import {AnyAction, Dispatch} from 'redux';
import {CommentType, PostType} from '../interfaces';
import {PostsAPI} from '../api/posts';
import {CommentsAPI} from "../api/comments";

const SET_SERVER_POSTS = 'SET_SERVER_POSTS';
const SET_SERVER_POST = 'SET_SERVER_POST';
const SET_COMMENT = 'SET_COMMENT';

export type InitialState = {
    posts: PostType[];
    post?: PostType | null;
}

const initialState: InitialState = {
    posts: [],
    post: null,
};

export const post_reducer = (state = initialState, action: AnyAction): InitialState => {

    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};

        case SET_SERVER_POSTS: {
            return {...state, posts: action.payload};
        }

        case SET_SERVER_POST: {
            return {...state, post: action.payload};
        }

        case SET_COMMENT: {
            return {...state, post: {...state.post!, comments: [...state.post!.comments, action.payload]}}
        }

        default : {
            return state
        }
    }
};


export const setServerPostsAC = (data: PostType[]) => {
    return {type: SET_SERVER_POSTS, payload: data};
};

export const setServerPostAC = (data: PostType) => {
    return {type: SET_SERVER_POST, payload: data};
};


export const setCommentAC = (data: CommentType) => {
    return {type: SET_COMMENT, payload: data};
};


export const addPost = (titleData: PostType['title'], postData: PostType['body']) => async () => {
    try {

        await PostsAPI.addPost(titleData, postData);

        alert('Your post added');
    } catch (e) {
        alert(e.message);
    }

};

export const addComment = (id: PostType['id'], comment: CommentType['body']) => async (dispatch: Dispatch) => {
    try {
        const newComment = await CommentsAPI.addComment(id, comment);
        dispatch(setCommentAC(newComment))

    } catch (e) {
        alert(e.message);
    }

};