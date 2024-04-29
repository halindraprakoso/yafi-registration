import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	unstable_useControl as useControl,
	type FieldMetadata,
} from "@conform-to/react";
import { useId, useRef, type ElementRef } from "react";
import { Label } from "~/components/ui/label";

export function RadioGroupConform({
	meta,
	items,
	label,
	className,
}: {
	meta: FieldMetadata<string>;
	items: Array<{ value: string; label: string }>;
	label?: string;
	className?: string;
}) {
	const radioGroupRef = useRef<ElementRef<typeof RadioGroup>>(null);
	const control = useControl(meta);

	const fallbackId = useId();
	const id = meta.id ?? fallbackId;

	return (
		<div className={className}>
			{label && <Label htmlFor={id}>{label}</Label>}

			<input
				ref={control.register}
				name={meta.name}
				defaultValue={meta.initialValue}
				tabIndex={-1}
				className="sr-only"
				onFocus={() => {
					radioGroupRef.current?.focus();
				}}
			/>
			<RadioGroup
				ref={radioGroupRef}
				className="flex items-center gap-4"
				value={control.value ?? ""}
				onValueChange={control.change}
				onBlur={control.blur}
			>
				{items.map((item) => {
					return (
						<div className="flex items-center gap-2" key={item.value}>
							<RadioGroupItem
								value={item.value}
								id={`${meta.id}-${item.value}`}
							/>
							<label htmlFor={`${meta.id}-${item.value}`}>{item.label}</label>
						</div>
					);
				})}
			</RadioGroup>

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
}
