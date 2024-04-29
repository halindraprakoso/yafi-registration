import { getInputProps, type FieldMetadata } from "@conform-to/react";
import { useId, type ComponentProps } from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { Input } from "../ui/input";

export const InputConform = ({
	meta,
	type,
	label,
	className,
	...props
}: {
	meta: FieldMetadata<string>;
	type: Parameters<typeof getInputProps>[1]["type"];
	label?: string;
	className?: string;
} & ComponentProps<typeof Input>) => {
	const fallbackId = useId();
	const id = meta.id ?? props.id ?? fallbackId;

	return (
		<div className={cn("w-full", className)}>
			{label && <Label htmlFor={id}>{label}</Label>}

			<Input
				{...getInputProps(meta, { type, ariaAttributes: true })}
				{...props}
			/>

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
};
