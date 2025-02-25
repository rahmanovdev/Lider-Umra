import { api } from '..';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const galleryApi = api.injectEndpoints({
	endpoints: build => ({
		getGalleries: build.query<GALLERY.ITEM[], void>({
			query: () => ({
				url: `/${ENDPOINTS}/blog/photos/`
			})
		})
	}),
	overrideExisting: true
});

export const { useGetGalleriesQuery } = galleryApi;
