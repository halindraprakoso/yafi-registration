import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { CloudIcon, LockIcon, ServerIcon } from "lucide-react";
import { z } from "zod";
import { AddressSelect } from "~/components/conform/AddressSelect";
import { InputConform } from "~/components/conform/Input";
import { RadioGroupConform } from "~/components/conform/RadioGroup";
import { SelectConform } from "~/components/conform/Select";
import { Button, buttonVariants } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { zodEnum, zodText } from "~/lib/utils";

export const meta: MetaFunction = () => {
	return [
		{ title: "Registrasi Raudhah & Insan Rabbany" },
		{
			name: "description",
			content: "Selamat datang di lembar registrasi sekolah",
		},
	];
};

const schema = z.object({
	valueCenter: zodEnum([
		"b8f50eda-38dc-11ed-83d4-9f9eee0da2d5",
		// "b8f51b1e-38dc-11ed-83d4-178e16605ac4",
		"b8f521ea-38dc-11ed-83d4-e3681a2e816b",
		"b8f5276c-38dc-11ed-83d4-df9730846b14",
	]),
	academicYear: zodEnum([
		"111f75fa-5fb5-11ee-80e2-9b997668bcd3",
		"b8f15c4a-38dc-11ed-83d4-4fde38efaa46",
	]),
	fullname: zodText,
	nickname: zodText,
	gender: zodEnum(["MALE", "FEMALE"]),
	province: zodText,
	city: zodText,
	district: zodText,
	village: zodText,
});

const features = [
	{
		name: "Push to deploy.",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: CloudIcon,
	},
	{
		name: "SSL certificates.",
		description:
			"Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
		icon: LockIcon,
	},
	{
		name: "Database backups.",
		description:
			"Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
		icon: ServerIcon,
	},
];

export default function Index() {
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
									className="h-8 w-auto"
									src="logo-both.png"
								/>
							</a>
						</nav>
					</div>
				</div>
			</header>

			<div className="relative">
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
										Anim aute id magna aliqua ad ad non deserunt sunt
									</div>
								</div>
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
									Pendaftaran Raudhah & Insan Rabbany
								</h1>
								<p className="mt-6 text-lg leading-8 text-gray-600">
									Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
									qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
									occaecat fugiat aliqua.
								</p>
								<div className="mt-10 flex items-center gap-x-6">
									<a
										href="#form-section"
										className={buttonVariants({ variant: "default" })}
									>
										Daftar Sekarang
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
					<img
						className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
						src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
						alt=""
					/>
				</div>
			</div>

			<div className="overflow-hidden bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl md:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
						<div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
							<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
								<h2 className="text-base font-semibold leading-7 text-indigo-600">
									Pendaftaran
								</h2>
								<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
									A better workflow
								</p>
								<p className="mt-6 text-lg leading-8 text-gray-600">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Maiores impedit perferendis suscipit eaque, iste dolor
									cupiditate blanditiis ratione.
								</p>
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
							<div className="relative isolate overflow-hidden bg-blue-500 px-6 py-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:px-10  sm:pt-16 lg:mx-0 lg:max-w-none">
								<div
									className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-gray-100 opacity-30 ring-1 ring-inset ring-white"
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

function RegistrationForm() {
	const actionData = useActionData<typeof action>();

	const [form, field] = useForm<z.infer<typeof schema>>({
		id: "registration-form",
		lastResult: actionData?.result,
		onValidate: ({ formData }) => parseWithZod(formData, { schema }),
		defaultValue: {
			gender: "MALE",
			province: "36",
		},
		onSubmit: (event) => {
			event.preventDefault();
		},
	});

	return (
		<div id="form-section" className="flex justify-center">
			<Card className="max-w-xl w-full opacity-90">
				<CardHeader>
					<CardTitle>Form Registrasi</CardTitle>
					<CardDescription>
						Silahkan isi form berikut untuk mendaftarkan Ananda. Staff kami akan
						segera menghubungi Ayah/Bunda untuk proses selanjutnya.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form method="POST" {...getFormProps(form)} className="space-y-5">
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
							label="Tahun Ajaran"
						/>

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

						<Separator />

						<AddressSelect kind="province" meta={field.province} />
						<AddressSelect kind="city" meta={field.city} />
						<AddressSelect kind="district" meta={field.district} />
						<AddressSelect kind="village" meta={field.village} />

						<div className="pt-10">
							<Button type="submit" className="w-full">
								Kirim
							</Button>
						</div>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const submission = parseWithZod(await request.formData(), { schema });
	if (submission.status !== "success")
		return json(
			{ result: submission.reply() },
			{ status: submission.status === "error" ? 400 : 200 },
		);

	const input = submission.value;

	return redirect(".");
}
