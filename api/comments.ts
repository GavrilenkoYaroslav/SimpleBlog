import instance from '.';
import { CommentType, PostType } from '../interfaces';

export const CommentsAPI = {

	async addComment(postId: PostType['id'], text: CommentType['body']): Promise<CommentType> {
		const { data: comment } = await instance.post('posts', {
			postId,
			body: text,
		});

		return comment;
	},

};