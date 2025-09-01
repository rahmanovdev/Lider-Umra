/* eslint-disable @typescript-eslint/no-unused-vars */
 namespace BLOG {
	interface DetailDescription {
		id: number;
		text: string;
		image: string;
	}

	interface Blog {
		id: number;
		title: string;
		rich: string;
		image: string;
		created_at: string;
		desc_blogs: DetailDescription[];
	}

	type GetBlogsResponse = Blog[];
}
