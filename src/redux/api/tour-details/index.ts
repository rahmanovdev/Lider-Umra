import { api as index } from '..';
import { Package } from './types'

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

		getFoodInfo: build.query<Package.GetFoodInfoResponse, Package.DetailType>({
			query: detailType => ({
				url: `${ENDPOINTS}/tour/package-details/`,
				method: 'GET',
				params: { detail_type: detailType }
			}),
			transformResponse: (response: Package.GetPackageDetailsResponse) => {
				return response
					.filter(item => item.detail_type === 'FoodInfo')
					.map(item => ({
						id: item.id,
						title: item.name,
						description: item.rich,
						images: [item.image]
					}));
			}
		}),

		getGifts: build.query<Package.GetGiftsResponse, Package.DetailType>({
			query: detailType => ({
				url: `${ENDPOINTS}/tour/package-details/`,
				method: 'GET',
				params: { detail_type: detailType }
			}),
			transformResponse: (response: Package.GetPackageDetailsResponse) => {
				return response
					.filter(item => item.detail_type === 'YouGet')
					.map(item => ({
						id: item.id,
						title: item.name,
						description: item.rich,
						shortDescription: item.rich.substring(0, 100),
						image: item.image
					}));
			}
		}),

		getWarnings: build.query<Package.GetWarningsResponse, Package.DetailType>({
			query: detailType => ({
				url: `${ENDPOINTS}/tour/package-details/`,
				method: 'GET',
				params: { detail_type: detailType }
			}),
			transformResponse: (response: Package.GetPackageDetailsResponse) => {
				return response
					.filter(item => item.detail_type === 'Restrictions')
					.map(item => ({
						id: item.id,
						title: item.name,
						description: item.rich,
						image: item.image
					}));
			}
		})
	})
});

export const {
	useGetPackageDetailsQuery,
	useGetPackageDetailByIdQuery,
	useGetFoodInfoQuery,
	useGetGiftsQuery,
	useGetWarningsQuery
} = api;
