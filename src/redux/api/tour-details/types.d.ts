export namespace Package {
	type DetailType =
		| 'FoodInfo'
		| 'Requirements'
		| 'Restrictions'
		| 'PlacesToVisit'
		| 'YouGet';

	interface Warning {
		id: number;
		title: string;
		description: string;
		image: string;
	}

	type GetWarningsResponse = Warning[];
	interface CategoryPackage {
		id: number;
		name: string;
	}

	interface PackageDetail {
		id: number;
		category: CategoryPackage;
		name: string;
		rich: string;
		image: string;
		video_url: string;
		detail_type:
			| 'FoodInfo'
			| 'Requirements'
			| 'Restrictions'
			| 'PlacesToVisit'
			| 'YouGet';
		detail_type_display: string;
	}

	interface FoodInfo {
		id: number;
		title: string;
		description: string;
		images: string[];
	}

	interface Gift {
		id: number;
		title: string;
		description: string;
		shortDescription: string;
		image: string;
	}

	type GetPackageDetailsResponse = PackageDetail[];
	type GetFoodInfoResponse = FoodInfo[];
	type GetGiftsResponse = Gift[];
}
