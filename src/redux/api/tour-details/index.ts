/* eslint-disable @typescript-eslint/no-explicit-any */
import { api as index } from '..';
import { Package } from './types';

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
	endpoints: build => ({
		getPackageDetails: build.query<Package.GetPackageDetailsResponse, void>({
			query: () => ({
				url: `${ENDPOINTS}/tour/package-details/`,
				method: 'GET'
			}),
			providesTags: ['packageDetails']
		}),

		getPackageDetailById: build.query<Package.PackageDetail, number>({
			query: id => ({
				url: `${ENDPOINTS}/tour/package-details/${id}/`,
				method: 'GET'
			}),
			providesTags: ['packageDetails']
		}),

		getPackageDetail: build.query<
			any[],
			{ type: Package.DetailType; category?: Package.CategoryPackage }
		>({
			query: ({ type }) => ({
				url: `${ENDPOINTS}/tour/package-details/`,
				method: 'GET',
				params: { detail_type: type }
			}),
			transformResponse: (
				response: Package.GetPackageDetailsResponse,
				meta,
				{ type, category }
			) => {
				console.log(response)
				return response
					.filter(
						item =>
							item.detail_type === type &&
							(category
								? item.category.id === category?.id &&
								  item.category.name === item.category.name
								: true)
					)
					.map(item => ({
						id: item.id,
						title: item.name,
						description: item.rich,
						images: item.package_detail_images.map(v=>v.image),
						category: item.category
					}));
			}
		})
	}),
	overrideExisting: true
});

export const {
	useGetPackageDetailsQuery,
	useGetPackageDetailByIdQuery,
	useGetPackageDetailQuery
} = api;
