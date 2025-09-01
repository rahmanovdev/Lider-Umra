import { api } from '..';
import { LESSONS } from './types'


const lessonsApi = api.injectEndpoints({
	overrideExisting: true,
	endpoints: build => ({
		getLessons: build.query<LESSONS.ITEM[],void>({
			query: () => ({
				url: `/blog/lessons/`,
				method: "GET"
			})
		})
	})
});

export const {useGetLessonsQuery} = lessonsApi;
