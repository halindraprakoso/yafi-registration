import { getSearchParams } from "@/lib/utils";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import geografis from "geografis";

export async function loader({ request }: LoaderFunctionArgs) {
	const { code, kind } = getSearchParams(request, ["code", "kind"]);

	let options: { name: string; value: string }[] = [];

	if (kind === "province") {
		options = geografis
			.getProvinces()
			.map((x) => ({ name: x.province, value: x.code }));
	}

	if (kind === "city") {
		const cities = geografis.getProvince(code ?? "11").cities;
		options = cities.map((x) => ({ name: x.city, value: x.code }));
	}

	if (kind === "district") {
		const districts = geografis.getCity(code ?? "11.01").districts;
		options = districts.map((x) => ({ name: x.district, value: x.code }));
	}

	if (kind === "village") {
		const villages = geografis.getDistrict(code ?? "11.01.01").villages;
		options = villages.map((x) => ({
			name: `${x.village} - ${geografis.getVillage(x.code).postal}`,
			value: x.code,
		}));
	}

	return json({ options });
}
