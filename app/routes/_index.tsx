import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { z } from "zod";
import { InputConform } from "~/components/conform/Input";
import { RadioGroupConform } from "~/components/conform/RadioGroup";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { zodText } from "~/lib/utils";

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
	fullname: zodText,
	nickname: zodText,
	gender: z.enum(["MALE", "FEMALE"]),
});

export default function Page() {
	const actionData = useActionData<typeof action>();

	const [form, field] = useForm<z.infer<typeof schema>>({
		id: "registration-form",
		lastResult: actionData?.result,
		onValidate: ({ formData }) => parseWithZod(formData, { schema }),
		defaultValue: {
			gender: "MALE",
		},
	});

	return (
		<div className="p-10">
			<Card className="p-10 max-w-xl">
				<Form method="POST" {...getFormProps(form)} className="space-y-5">
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
					<Button type="submit" className="w-full">
						Kirim
					</Button>
				</Form>
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
