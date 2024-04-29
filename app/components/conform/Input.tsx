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
	inputProps,
}: {
	meta: FieldMetadata<string>;
	type: Parameters<typeof getInputProps>[1]["type"];
	label?: string;
	className?: string;
	inputProps?: ComponentProps<typeof Input>;
}) => {
	const fallbackId = useId();
	const id = meta.id ?? inputProps?.id ?? fallbackId;

	return (
		<div className={cn("w-full", className)}>
			{label && <Label htmlFor={id}>{label}</Label>}

			<Input
				{...getInputProps(meta, { type, ariaAttributes: true })}
				{...inputProps}
				className={cn(
					"uppercase placeholder:normal-case",
					inputProps?.className,
				)}
			/>

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
};
