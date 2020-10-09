import {HYDRATE} from "next-redux-wrapper";
import { AnyAction, Dispatch } from 'redux';
import { PostType } from '../interfaces';
import { PostsAPI } from '../api/posts';

const SET_SERVER_POSTS = 'SET_SERVER_POSTS';
const SET_SERVER_POST = 'SET_SERVER_POST';
const SET_PROGRESS = 'SET_PROGRESS';

export type InitialState = {
    posts: PostType[];
    inProgress: boolean;
    post?: PostType | null;
}

const initialState: InitialState = {
    inProgress: false,
    posts: [],
    post: null,
};

export const post_reducer = (state = initialState, action:AnyAction): InitialState=> {

    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};

        case SET_SERVER_POSTS: {
            return {...state, posts: action.payload};
        }

        case SET_SERVER_POST: {
            return {...state, post: action.payload};
        }

        case SET_PROGRESS: {
            return {...state, inProgress: action.payload}
        }

        default : {return state}
    }
};


export const setServerPostsAC = (data: PostType[]) => {
    return { type: SET_SERVER_POSTS, payload: data };
};

export const setServerPostAC = (data: PostType) => {
    return { type: SET_SERVER_POST, payload: data };
};

export const setProgressAC = (progress: boolean) => {
    return { type: SET_PROGRESS, payload: progress };
};

export const addPost = (titleData: PostType['title'], postData: PostType['body']) => async (dispatch: Dispatch ) => {
    try {
        dispatch(setProgressAC(true));

        await PostsAPI.addPost(titleData, postData);

        alert('Your post added');
    } catch ( e ) {
        alert(e.message);
    } finally {
        dispatch(setProgressAC(false));
    }

}