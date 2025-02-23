/* eslint-disable @typescript-eslint/no-unused-vars */
namespace HOTEL {
	interface IHotel {
		id: number;
		category: {
			id: number;
			name: string;
		};
		name: string;
		city: string;
		city_display: string;
		stars: number;
		stars_display: string;
		image?: string; // image полясын кошобуз
		distance_to_mosque: string;
		accommodation: string;
		meals: string;
		nights: number;
	}

	type GetHotelsResponse = IHotel[];
}
