import Link from 'next/link';

const Navigation = () => {
	return (
		<>
			<div>
				<Link href={'/'}><a>Go to all posts</a></Link>
			</div>

			<div>
				<Link href={'/posts/new'}><a>Create new post</a></Link>
			</div>
		</>
	);
};

export default Navigation;