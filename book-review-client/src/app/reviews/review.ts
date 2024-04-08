export interface Review {
	id: number;
	createdAt: string;
	lastUpdatedAt: string;
	// author: string;
	title: string;
	body: string;
	rating: number;
	imageUrl: string | null;
	tags: string[];
	// meta: string[]; // author link, other links
}
