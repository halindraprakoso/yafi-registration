import { Textarea } from "@/components/ui/textarea";
import { getTextareaProps, type FieldMetadata } from "@conform-to/react";
import { useId, type ComponentProps } from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export const TextareaConform = ({
	meta,
	label,
	className,
	...props
}: {
	meta: FieldMetadata<string>;
	label?: string;
	className?: string;
} & ComponentProps<typeof Textarea>) => {
	const fallbackId = useId();
	const id = meta.id ?? props.id ?? fallbackId;

	return (
		<div className={cn("w-full", className)}>
			{label && <Label htmlFor={id}>{label}</Label>}

			<Textarea {...getTextareaProps(meta)} {...props} />

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
};
