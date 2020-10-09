import {MakeStore, createWrapper} from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import {post_reducer} from "./post-reducer";
import thunkMiddleware from 'redux-thunk';


const makeStore: MakeStore<any> = () => createStore(post_reducer, applyMiddleware(thunkMiddleware));

export const wrapper = createWrapper<any>(makeStore);