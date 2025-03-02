import { api as index } from '..';


const api = index.injectEndpoints({
	endpoints: build => ({
		getBlogs: build.query<BLOG.GetBlogsResponse, void>({
			query: () => ({
				url: `/blog/blogs/`,
				method: 'GET'
			}),
			providesTags: ['blogs']
		}),

		getBlogById: build.query<BLOG.Blog, number>({
			query: id => ({
				url: `/blog/blogs/${id}/`,
				method: 'GET'
			}),
			providesTags: ['blogs']
		})
	})
});

export const { useGetBlogsQuery, useGetBlogByIdQuery } = api;
