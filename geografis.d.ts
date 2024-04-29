declare module 'geografis' {
	interface Village {
		code: string;
		postal: number;
		// add other attributes
	}

	interface Province {
		code: string;
		province: string;
		slug: string;
		// add other attributes
	}

	interface SearchOptions {
		count: number;
		limit: number;
		offset: number;
		data: Village[];
	}

	interface GetProvince {
		code: string;
		province: string;
		cities: {
			code: string;
			city: string;
			slug: string;
		}[];
	}

	interface GetCity {
		code: string;
		city: string;
		province: string;
		slug: string;
		districts: {
			code: string;
			district: string;
			slug: string;
		}[];
	}

	interface GetDistrict {
		code: string;
		district: string;
		city: string;
		province: string;
		slug: string;
		villages: {
			code: string;
			village: string;
			slug: string;
		}[];
	}

	interface GetVillage {
		code: string;
		village: string;
		district: string;
		city: string;
		province: string;
		slug: string;
		postal: number;
		latitude: number;
		longitude: number;
		elevation: number;
		geometry: boolean;
	}

	export function index(): any;
	export function dump(): Village[];
	export function search(
		query: string,
		limit?: number,
		offset?: number,
		useIndex?: boolean,
	): SearchOptions;

	export function getProvinces(): Province[];
	export function getProvince(code: string): GetProvince;
	export function getProvinceBySlug(slug: string): GetProvince;
	export function getCity(code: string): GetCity;
	export function getCityBySlug(slug: string): GetCity;
	export function getDistrict(code: string): GetDistrict;
	export function getDistrictBySlug(slug: string): GetDistrict;
	export function getVillage(code: string): GetVillage;
	export function getVillageBySlug(slug: string): GetVillage;
	// Add other methods
}
