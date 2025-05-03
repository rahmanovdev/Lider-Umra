namespace TOURS {
	interface IAjy {
		id: number;
		name: string;
		bio: string;
		image: string;
	}

	interface ICategory {
		id: number;
		name: string;
		category: string;
	}

	interface ITourDate {
		id: number;
		start_tour: string;
		end_tour: string;
		duration: number;
	}

	interface ITourPackages {
		ajy: IAjy;
		available_seats: number;
		category: ICategory;
		description: string;
		id: number;
		image: string;
		is_active: boolean;
		name: string;
		tour_date: ITourDate;
	}

	type GetTourPackagesResponse = ITourPackages[];
}
