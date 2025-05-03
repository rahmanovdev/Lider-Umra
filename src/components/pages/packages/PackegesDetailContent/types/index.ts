// types/index.ts
export interface Section {
	id: number;
	title: string;
	type: 'food' | 'places' | 'recommendations' | 'warnings' | 'gifts';
	icon: React.ReactNode;
}

export interface Food {
	id: number;
	images: string[];
	title: string;
	description: string;
}

export interface Hotel {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	details: {
		label: string;
		value: string;
	}[];
}

export interface Place {
	id: number;
	title: string;
	image: string;
	shortDescription: string;
	fullDescription: string;
}

export interface Warning {
	id: number;
	title: string;
	image: string;
	description: string;
}

export interface Gift {
	id: number;
	title: string;
	image: string[];
	shortDescription: string;
	fullDescription: string;
}
