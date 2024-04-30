import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
	Form,
	json,
	redirect,
	useActionData,
	useLoaderData,
	useSubmit,
} from "@remix-run/react";
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import geografis from "geografis";
import {
	ArrowDownIcon,
	CheckIcon,
	CreditCardIcon,
	InfoIcon,
	SquarePenIcon,
} from "lucide-react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { z } from "zod";
import { AddressSelect } from "~/components/conform/AddressSelect";
import { DatePickerConform } from "~/components/conform/DatePicker";
import { InputConform } from "~/components/conform/Input";
import { RadioGroupConform } from "~/components/conform/RadioGroup";
import { SelectConform } from "~/components/conform/Select";
import { TextareaConform } from "~/components/conform/Textarea";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { csrf } from "~/lib/csrf.server";
import { honeypot } from "~/lib/honeypot.server";
import { zodDate, zodEnum, zodText } from "~/lib/utils";

const store = createStore(
	{
		showConfirmationDialog: false,
		formData: null as FormData | null,
	},
	{
		showConfirmationDialog: (_, event: { formData: FormData }) => {
			return {
				showConfirmationDialog: true,
				formData: event.formData,
			};
		},
		closeConfirmationDialog: () => {
			return {
				showConfirmationDialog: false,
				formData: null,
			};
		},
	},
);

export const meta: MetaFunction = () => {
	return [
		{ title: "Registrasi Raudhah & Insan Rabbany" },
		{
			name: "description",
			content: "Selamat datang di lembar registrasi sekolah",
		},
	];
};

const features = [
	{
		name: "Isi formulir pendaftaran.",
		description:
			"Pastikan kebenaran data agar mempercepat proses validasi. Jika pendafaran ditutup, pendaftaran akan masuk ke waiting list untuk kami hubungi jika kapasitas memenuhi.",
		icon: SquarePenIcon,
	},
	{
		name: "Tunggu informasi dari kami.",
		description:
			"Setelah selesai divalidasi, kami akan mengirimkan link untuk pembayaran pendaftaran lewat e-mail. Staff kami juga akan menghubungi Bapak/Ibu jika diperlukan.",
		icon: InfoIcon,
	},
	{
		name: "Lakukan pembayaran invoice.",
		description: "Pembayaran invoice sebagai bentuk konfirmasi pendaftaran.",
		icon: CreditCardIcon,
	},
	{
		name: "Terima konfirmasi pendaftaran.",
		description: "Konfirmasi pendaftaran akan dikirim lewat e-mail.",
		icon: CheckIcon,
	},
];

export async function loader() {
	const provinces = geografis.getProvinces();
	return {
		provinces: provinces.map((x) => ({ name: x.province, value: x.code })),
		randomNumber: Math.random(),
	};
}

export default function Index() {
	const { randomNumber } = useLoaderData<typeof loader>();
	return (
		<div>
			<header className="absolute inset-x-0 top-0 z-50">
				<div className="mx-auto max-w-7xl">
					<div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
						<nav
							className="flex items-center justify-between lg:justify-start"
							aria-label="Global"
						>
							<a href="https://raudhah.sch.id" className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<img
									alt="Your Company"
									className="h-20 w-auto"
									src="logo-both.png"
								/>
							</a>
						</nav>
					</div>
				</div>
			</header>

			<div className="relative mt-0.5">
				<div className="mx-auto max-w-7xl">
					<div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
						<svg
							className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<polygon points="0,0 90,0 50,100 0,100" />
						</svg>

						<div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
							<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
								<div className="hidden sm:mb-10 sm:flex">
									<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
										Dapatkan diskon early bird sampai dengan 30%
									</div>
								</div>
								<div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
									<p>Pendaftaran</p>
									<p className="text-red-400 pl-10">Raudhah</p>
									<p className="text-orange-400 pl-20">Insan Rabbany</p>
								</div>
								<p className="mt-6 text-lg leading-8 text-gray-600">
									Melalui halaman ini, Bapak/Ibu dapat mendaftarkan Ananda ke
									sekolah kami dengan mudah dan cepat.
								</p>
								<div className="mt-10 flex items-center gap-x-6">
									<a
										href="#form-section"
										className={buttonVariants({
											variant: "default",
											className: "w-full",
										})}
									>
										Daftar Sekarang <ArrowDownIcon className="size-5 ml-3" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
					<img
						className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
						src={
							randomNumber < 0.25
								? "hero-tk.webp"
								: randomNumber < 0.5
									? "hero-sd.webp"
									: randomNumber < 0.75
										? "hero-smp.png"
										: "hero-sma.webp"
						}
						alt=""
					/>
				</div>
			</div>

			<div className="overflow-hidden bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl md:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-1 lg:items-start">
						<div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
							<div className="mx-auto lg:mx-0 ">
								{/* <h2 className="text-base font-semibold leading-7 text-indigo-600">
									Pendaftaran
								</h2> */}
								<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
									Langkah-langkah Proses Pendaftaran
								</p>
								{/* <p className="mt-6 text-lg leading-8 text-gray-600">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Maiores impedit perferendis suscipit eaque, iste dolor
									cupiditate blanditiis ratione.
								</p> */}
								<dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
									{features.map((feature) => (
										<div key={feature.name} className="relative pl-9">
											<dt className="inline font-semibold text-gray-900">
												<feature.icon
													className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
													aria-hidden="true"
												/>
												{feature.name}
											</dt>{" "}
											<dd className="inline">{feature.description}</dd>
										</div>
									))}
								</dl>
							</div>
						</div>
						<div className="sm:px-6 lg:px-0">
							<div className="relative isolate overflow-hidden bg-blue-400 px-2 py-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:px-10  sm:pt-16 lg:mx-0 lg:max-w-none">
								<div
									className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-gray-100 opacity-30 ring-1 ring-inset ring-white"
									aria-hidden="true"
								/>
								<div
									className="absolute -inset-y-px -right-96 -z-10 w-full origin-bottom-right skew-x-[-30deg] bg-gray-100 opacity-30 ring-1 ring-inset ring-white"
									aria-hidden="true"
								/>
								<RegistrationForm />

								<div
									className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const studentSchema = {
	valueCenter: zodEnum([
		"b8f50eda-38dc-11ed-83d4-9f9eee0da2d5",
		"b8f51b1e-38dc-11ed-83d4-178e16605ac4",
		"b8f521ea-38dc-11ed-83d4-e3681a2e816b",
		"b8f5276c-38dc-11ed-83d4-df9730846b14",
	]),
	academicYear: zodEnum([
		"111f75fa-5fb5-11ee-80e2-9b997668bcd3",
		"b8f15c4a-38dc-11ed-83d4-4fde38efaa46",
	]),
	grade: zodEnum([
		"-2",
		"-1",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
	]),
	fullname: zodText,
	nickname: zodText,
	gender: zodEnum(["MALE", "FEMALE"]),
	birthPlace: zodText,
	birthDate: zodDate,
	NISN: zodText.optional(),
	previousSchool: zodText.optional(),
	admissionNote: zodText.optional(),
};

const addressSchema = {
	province: zodText,
	city: zodText,
	district: zodText,
	village: zodText,
	street: zodText,
	houseNumber: zodText,
	addressDescription: zodText.optional(),
};

const guardianSchema = {
	motherFullname: zodText,
	motherPhone: zodText,
	motherEmail: zodText.email(),
	fatherFullname: zodText,
	fatherPhone: zodText,
	fatherEmail: zodText.email(),
};

const schema = z.object({
	...studentSchema,
	...addressSchema,
	...guardianSchema,
});

const kindergartenGrades = [
	{
		name: "Playgroup",
		value: "-2",
	},
	{
		name: "TK A",
		value: "-1",
	},
	{
		name: "TK B",
		value: "0",
	},
];

const primaryGrades = [
	{
		name: "Kelas 1",
		value: "1",
	},
	{
		name: "Kelas 2",
		value: "2",
	},
	{
		name: "Kelas 3",
		value: "3",
	},
	{
		name: "Kelas 4",
		value: "4",
	},
	{
		name: "Kelas 5",
		value: "5",
	},
	{
		name: "Kelas 6",
		value: "6",
	},
];

const secondarySchoolGrades = [
	{
		name: "Kelas 7",
		value: "7",
	},
	{
		name: "Kelas 8",
		value: "8",
	},
	{
		name: "Kelas 9",
		value: "9",
	},
];

const highschoolGrades = [
	{
		name: "Kelas 10",
		value: "10",
	},
	{
		name: "Kelas 11",
		value: "11",
	},
	{
		name: "Kelas 12",
		value: "12",
	},
];

function RegistrationForm() {
	const { provinces } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();

	const [form, field] = useForm<z.infer<typeof schema>>({
		id: "registration-form",
		lastResult: actionData?.result,
		constraint: getZodConstraint(schema),
		onValidate: ({ formData }) => parseWithZod(formData, { schema }),
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		defaultValue: {
			gender: "MALE",
			province: "36",
			academicYear: "111f75fa-5fb5-11ee-80e2-9b997668bcd3",
		},
		onSubmit: (event, ctx) => {
			event.preventDefault();
			store.send({ type: "showConfirmationDialog", formData: ctx.formData });
		},
	});

	return (
		<div id="form-section" className="flex justify-center">
			<Card className="w-full opacity-90">
				<CardHeader>
					<CardTitle>Form Registrasi</CardTitle>
					<CardDescription>
						Silahkan isi form berikut untuk mendaftarkan Ananda. Staff kami akan
						segera menghubungi Ayah/Bunda untuk proses selanjutnya.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form method="POST" {...getFormProps(form)}>
						<AuthenticityTokenInput />
						<HoneypotInputs label="Please leave this field blank" />

						<div className="lg:flex gap-5 w-full mb-10 space-y-5 lg:space-y-0">
							<SelectConform
								meta={field.valueCenter}
								items={[
									{
										name: "KB-TK Islam Raudhah",
										value: "b8f50eda-38dc-11ed-83d4-9f9eee0da2d5",
									},
									{
										name: "SD Islam Raudhah (Pendaftaran Ditutup)",
										value: "b8f51b1e-38dc-11ed-83d4-178e16605ac4",
									},
									{
										name: "SMP Insan Rabbany",
										value: "b8f521ea-38dc-11ed-83d4-e3681a2e816b",
									},
									{
										name: "SMA Insan Rabbany",
										value: "b8f5276c-38dc-11ed-83d4-df9730846b14",
									},
								]}
								placeholder="Pilih Sekolah"
								label="Mendaftar ke"
							/>
							<SelectConform
								meta={field.academicYear}
								items={[
									{
										name: "2024/25",
										value: "111f75fa-5fb5-11ee-80e2-9b997668bcd3",
									},
									{
										name: "2023/24",
										value: "b8f15c4a-38dc-11ed-83d4-4fde38efaa46",
									},
								]}
								placeholder="Pilih Tahun Ajaran"
								label="Untuk Tahun Ajaran"
							/>
							<SelectConform
								meta={field.grade}
								items={[
									...(field.valueCenter.value ===
									"b8f50eda-38dc-11ed-83d4-9f9eee0da2d5"
										? kindergartenGrades
										: field.valueCenter.value ===
												"b8f51b1e-38dc-11ed-83d4-178e16605ac4"
											? primaryGrades
											: field.valueCenter.value ===
													"b8f521ea-38dc-11ed-83d4-e3681a2e816b"
												? secondarySchoolGrades
												: field.valueCenter.value ===
														"b8f5276c-38dc-11ed-83d4-df9730846b14"
													? highschoolGrades
													: []),
								]}
								placeholder="Pilih Tingkat"
								label="Untuk Tingkat"
							/>
						</div>
						<div className="lg:flex gap-5 space-y-10 lg:space-y-0">
							<fieldset className="w-full space-y-3">
								<h1 className="text-sm font-bold">Siswa</h1>
								<Separator />

								<InputConform
									meta={field.fullname}
									type="text"
									label="Nama Lengkap Siswa"
								/>
								<InputConform
									meta={field.nickname}
									type="text"
									label="Nama Panggilan Siswa"
								/>
								<RadioGroupConform
									meta={field.gender}
									items={[
										{ value: "MALE", label: "Laki-laki" },
										{ value: "FEMALE", label: "Perempuan" },
									]}
								/>
								<InputConform
									meta={field.birthPlace}
									type="text"
									label="Tempat Lahir"
								/>
								<DatePickerConform
									meta={field.birthDate}
									label="Tanggal Lahir"
								/>
								<InputConform meta={field.NISN} type="text" label="NISN" />
								<InputConform
									meta={field.previousSchool}
									type="text"
									label="Asal Sekolah (sertakan lokasi)"
									inputProps={{
										placeholder: "Cth. SDN 01 Ciputat",
									}}
								/>
								<TextareaConform
									meta={field.admissionNote}
									label="Catatan"
									placeholder="Catatan tambahan untuk pendaftaran, Misal prestasi, kebutuhan khusus, dll."
								/>
							</fieldset>

							<fieldset className="w-full space-y-3">
								<h1 className="text-sm font-bold">Alamat</h1>
								<Separator />

								<AddressSelect
									kind="province"
									meta={field.province}
									provinces={provinces}
								/>
								<AddressSelect kind="city" meta={field.city} />
								<AddressSelect kind="district" meta={field.district} />
								<AddressSelect kind="village" meta={field.village} />
								<InputConform
									meta={field.street}
									type="text"
									label="Nama Jalan"
									inputProps={{
										placeholder: "Cth. Jl. Raya Ciputat",
									}}
								/>
								<InputConform
									meta={field.houseNumber}
									type="text"
									label="Blok dan Nomor Rumah"
									inputProps={{
										placeholder: "Cth. Blok N1 no. 5",
									}}
								/>
								<TextareaConform
									meta={field.addressDescription}
									label="Keterangan Alamat"
								/>
							</fieldset>

							<fieldset className="w-full space-y-3">
								<h1 className="text-sm font-bold">Orang Tua</h1>
								<Separator />
								<InputConform
									meta={field.motherFullname}
									type="text"
									label="Nama Lengkap Ibu"
								/>
								<InputConform
									meta={field.motherPhone}
									type="text"
									label="Nomor HP Ibu"
									className="placeholder:text-xs"
									inputProps={{
										className: "placeholder:text-xs",
										placeholder:
											"Gunakan +62 sebagai pengganti 0. Cth. +62812...",
									}}
								/>
								<InputConform
									meta={field.motherEmail}
									type="email"
									label="Email Ibu"
								/>

								<Separator />

								<InputConform
									meta={field.fatherFullname}
									type="text"
									label="Nama Lengkap Ayah"
								/>
								<InputConform
									meta={field.fatherPhone}
									type="text"
									label="Nomor HP Ayah"
									inputProps={{
										className: "placeholder:text-xs",
										placeholder:
											"Gunakan +62 sebagai pengganti 0. Cth. +62812...",
									}}
								/>
								<InputConform
									meta={field.fatherEmail}
									type="email"
									label="Email Ayah"
								/>
							</fieldset>
						</div>
						<div className="pt-10">
							<Button type="submit" className="w-full">
								Kirim
							</Button>
						</div>
					</Form>
				</CardContent>
			</Card>

			<ConfirmationDialog />
		</div>
	);
}

function ConfirmationDialog() {
	const submit = useSubmit();

	const showConfimationDialog = useSelector(
		store,
		(state) => state.context.showConfirmationDialog,
	);
	const formData = useSelector(store, (state) => state.context.formData);

	function handleSubmit() {
		if (formData) {
			submit(formData, { method: "POST" });
		}
	}

	return (
		<AlertDialog
			open={showConfimationDialog}
			onOpenChange={(isOpen) => {
				if (!isOpen) store.send({ type: "closeConfirmationDialog" });
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Konfirmasi Data</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex gap-5">
							{Object.keys(studentSchema).map((key) => {
								const value = formData?.get(key) as string;
								return (
									<div key={key} className="flex gap-2">
										<div className="font-semibold">{key}</div>
										<div>{value}</div>
									</div>
								);
							})}
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction onClick={handleSubmit}>
						Daftarkan
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	await csrf.validate(request);

	const formData = await request.formData();
	honeypot.check(formData);

	const submission = parseWithZod(formData, { schema });
	if (submission.status !== "success")
		return json(
			{ result: submission.reply() },
			{ status: submission.status === "error" ? 400 : 200 },
		);

	const input = submission.value;
	console.log("🚀 ~ action ~ input:", input);

	return redirect(".");
}
