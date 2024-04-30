import type { loader } from "@/routes/resources.address-select";
import type { FieldMetadata } from "@conform-to/react";
import { useFetcher } from "@remix-run/react";
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import { useEffect } from "react";
import { SelectConform } from "~/components/conform/Select";

export const selectAddressStore = createStore(
	{
		selectedProvince: "36",
		selectedCity: "",
		selectedDistrict: "",
		selectedVillage: "",
	},
	{
		setSelectedProvince: (_, event: { selectedProvince: string }) => {
			return {
				selectedProvince: event.selectedProvince,
				selectedCity: "",
				selectedDistrict: "",
				selectedVillage: "",
			};
		},
		setSelectedCity: (_, event: { selectedCity: string }) => {
			return {
				selectedCity: event.selectedCity,
				selectedDistrict: "",
				selectedVillage: "",
			};
		},
		setSelectedDistrict: (_, event: { selectedDistrict: string }) => {
			return {
				selectedDistrict: event.selectedDistrict,
				selectedVillage: "",
			};
		},
		setSelectedVillage: (_, event: { selectedVillage: string }) => {
			return {
				selectedVillage: event.selectedVillage,
			};
		},
	},
);
interface Props {
	meta: FieldMetadata<string>;
	kind: "province" | "city" | "district" | "village";
	provinces?: Array<{ name: string; value: string }>;
}
export function AddressSelect({ kind, ...props }: Props) {
	if (kind === "province") {
		return <ProvinceSelector {...props} provinces={props.provinces ?? []} />;
	}
	if (kind === "city") {
		return <CitySelector {...props} />;
	}
	if (kind === "district") {
		return <DistrictSelector {...props} />;
	}
	if (kind === "village") {
		return <VillageSelector {...props} />;
	}
}

function ProvinceSelector({
	meta,
	provinces,
}: {
	meta: FieldMetadata<string>;
	provinces: Array<{ name: string; value: string }>;
}) {
	const fetcher = useFetcher<typeof loader>();

	const selectedProvince = useSelector(
		selectAddressStore,
		(state) => state.context.selectedProvince,
	);

	return (
		<div>
			<SelectConform
				meta={meta}
				label="Provinsi"
				placeholder="Pilih Provinsi"
				items={provinces}
				value={selectedProvince}
				onValueChange={(e) => {
					selectAddressStore.send({
						type: "setSelectedProvince",
						selectedProvince: e,
					});
				}}
				disabled={fetcher.state === "loading"}
			/>
		</div>
	);
}

function CitySelector({
	meta,
}: {
	meta: FieldMetadata<string>;
}) {
	const fetcher = useFetcher<typeof loader>();

	const selectedProvince = useSelector(
		selectAddressStore,
		(state) => state.context.selectedProvince,
	);
	const selectedCity = useSelector(
		selectAddressStore,
		(state) => state.context.selectedCity,
	);

	useEffect(() => {
		if (selectedProvince) {
			fetcher.load(
				`/resources/address-select?code=${selectedProvince}&kind=city`,
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProvince]);

	useEffect(() => {
		if (meta.initialValue) {
			const value = fetcher.data?.options.find(
				(x) => x.name === meta.initialValue,
			)?.value;

			selectAddressStore.send({
				type: "setSelectedCity",
				selectedCity: value ?? "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetcher.data]);

	return (
		<div>
			<SelectConform
				meta={meta}
				label="Kota/Kabupaten"
				placeholder="Pilih Kota/Kabupaten"
				items={fetcher.data?.options ?? []}
				value={selectedCity}
				onValueChange={(e) => {
					selectAddressStore.send({
						type: "setSelectedCity",
						selectedCity: e,
					});
				}}
				disabled={fetcher.state === "loading"}
			/>
		</div>
	);
}

function DistrictSelector({ meta }: { meta: FieldMetadata<string> }) {
	const fetcher = useFetcher<typeof loader>();

	const selectedProvince = useSelector(
		selectAddressStore,
		(state) => state.context.selectedProvince,
	);
	const selectedCity = useSelector(
		selectAddressStore,
		(state) => state.context.selectedCity,
	);
	const selectedDistrict = useSelector(
		selectAddressStore,
		(state) => state.context.selectedDistrict,
	);

	useEffect(() => {
		if (selectedCity) {
			fetcher.load(
				`/resources/address-select?code=${selectedCity}&kind=district`,
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProvince, selectedCity]);

	useEffect(() => {
		if (meta.initialValue && fetcher.data?.options) {
			const value = fetcher.data?.options.find(
				(x) => x.name === meta.initialValue,
			)?.value;

			selectAddressStore.send({
				type: "setSelectedDistrict",
				selectedDistrict: value ?? "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetcher.data]);

	return (
		<div>
			<SelectConform
				meta={meta}
				label="Kecamatan"
				placeholder="Pilih Kecamatan"
				items={fetcher.data?.options ?? []}
				value={selectedDistrict}
				onValueChange={(e) => {
					selectAddressStore.send({
						type: "setSelectedDistrict",
						selectedDistrict: e,
					});
				}}
				disabled={fetcher.state === "loading"}
			/>
		</div>
	);
}

function VillageSelector({ meta }: { meta: FieldMetadata<string> }) {
	const fetcher = useFetcher<typeof loader>();

	const selectedProvince = useSelector(
		selectAddressStore,
		(state) => state.context.selectedProvince,
	);
	const selectedCity = useSelector(
		selectAddressStore,
		(state) => state.context.selectedCity,
	);
	const selectedDistrict = useSelector(
		selectAddressStore,
		(state) => state.context.selectedDistrict,
	);
	const selectedVillage = useSelector(
		selectAddressStore,
		(state) => state.context.selectedVillage,
	);

	useEffect(() => {
		if (selectedDistrict) {
			fetcher.load(
				`/resources/address-select?code=${selectedDistrict}&kind=village`,
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProvince, selectedCity, selectedDistrict]);

	useEffect(() => {
		if (meta.initialValue && fetcher.data?.options) {
			const value = fetcher.data?.options.find((x) =>
				x.name.startsWith(meta.initialValue ?? ""),
			)?.value;

			selectAddressStore.send({
				type: "setSelectedVillage",
				selectedVillage: value ?? "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetcher.data]);

	return (
		<div>
			<SelectConform
				meta={meta}
				label="Desa/Kelurahan"
				placeholder="Pilih Desa/Kelurahan"
				items={fetcher.data?.options ?? []}
				value={selectedVillage}
				onValueChange={(e) => {
					selectAddressStore.send({
						type: "setSelectedVillage",
						selectedVillage: e,
					});
				}}
				disabled={fetcher.state === "loading"}
			/>
		</div>
	);
}
