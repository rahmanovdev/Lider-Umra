import { api } from '..';
import { LESSONS } from './types'

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const lessonsApi = api.injectEndpoints({
	overrideExisting: true,
	endpoints: build => ({
		getLessons: build.query<LESSONS.ITEM[],void>({
			query: () => ({
				url: `${ENDPOINTS}/blog/lessons/`,
				method: "GET"
			})
		})
	})
});

export const {useGetLessonsQuery} = lessonsApi;
