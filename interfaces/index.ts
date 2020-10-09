export type CommentType = {
	id: string | number;
	body: string;
	postId: PostType['id'];
}

export type PostType = {
	id: number | string;
	title: string;
	body: string;
	comments: CommentType[];
}
