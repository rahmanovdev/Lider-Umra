import { api } from '..';


const galleryApi = api.injectEndpoints({
	endpoints: build => ({
		getGalleries: build.query<GALLERY.ITEM[], void>({
			query: () => ({
				url: `/blog/photos/`
			})
		})
	}),
	overrideExisting: true
});

export const { useGetGalleriesQuery } = galleryApi;
