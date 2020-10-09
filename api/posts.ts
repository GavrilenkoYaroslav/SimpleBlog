import instance from '.';
import { PostType } from '../interfaces';

export const PostsAPI = {

	async getPosts(): Promise<PostType[]> {
		const { data: posts } = await instance.get('posts');
		return posts;
	},

	async getPost(postId: PostType['id']): Promise<PostType> {
		const { data: post } = await instance.get(`posts/${postId}`, { params: { _embed: 'comments' } });
		return post;
	},

	async addPost(titleData: PostType['title'], postData: PostType['body']): Promise<PostType> {
		const { data: post } = await instance.post('posts', {
			title: titleData,
			body: postData,
		});
		return post;
	},

	async deletePost(postId: PostType['id']) {
		await instance.delete(`posts/${postId}`)
	}

};