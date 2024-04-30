import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	unstable_useControl as useControl,
	type FieldMetadata,
} from "@conform-to/react";
import { useId, useRef, type ComponentProps, type ElementRef } from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export const SelectConform = ({
	meta,
	items,
	placeholder,
	label,
	className,
	...props
}: {
	meta: FieldMetadata<string>;
	items: Array<{ name: string; value: string; disabled?: boolean }>;
	placeholder: string;
	label?: string;
	className?: string;
} & ComponentProps<typeof Select>) => {
	const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null);
	const control = useControl(meta);

	const fallbackId = useId();
	const id = meta.id ?? fallbackId;

	return (
		<div className={cn("w-full", className)}>
			{label && <Label htmlFor={id}>{label}</Label>}

			<select
				name={meta.name}
				defaultValue={meta.initialValue ?? ""}
				className="sr-only"
				ref={control.register}
				aria-hidden
				tabIndex={-1}
				onFocus={() => {
					selectRef.current?.focus();
				}}
			>
				<option value="" />
				{items.map((option) => (
					<option key={option.value} value={option.value} />
				))}
			</select>

			<Select
				{...props}
				value={control.value ?? ""}
				onValueChange={(event) => {
					control.change(event);
					props.onValueChange?.(event);
				}}
				onOpenChange={(open) => {
					if (!open) {
						control.blur();
					}
				}}
			>
				<SelectTrigger
					className={cn(!control.value && "text-muted-foreground")}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{items.map((item) => {
						return (
							<SelectItem
								key={item.value}
								value={item.value}
								disabled={item.disabled}
							>
								{item.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
};
