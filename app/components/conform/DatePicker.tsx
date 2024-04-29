import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
	unstable_useControl as useControl,
	type FieldMetadata,
} from "@conform-to/react";
import { useId } from "react";
import { Label } from "~/components/ui/label";

export function DatePickerConform({
	meta,
	label,
	className,
}: { meta: FieldMetadata<Date>; label?: string; className?: string }) {
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const control = useControl(meta);

	const fallbackId = useId();
	const id = meta.id ?? fallbackId;

	return (
		<div className={className}>
			{label && <Label htmlFor={id}>{label}</Label>}

			<input
				className="sr-only"
				aria-hidden
				tabIndex={-1}
				ref={control.register}
				name={meta.name}
				defaultValue={
					meta.initialValue ? new Date(meta.initialValue).toISOString() : ""
				}
				onFocus={() => {
					triggerRef.current?.focus();
				}}
			/>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						ref={triggerRef}
						variant={"outline"}
						className={cn(
							"w-64 justify-start text-left font-normal focus:ring-2 focus:ring-stone-950 focus:ring-offset-2",
							!control.value && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{control.value ? (
							format(control.value, "PPP")
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={new Date(control.value ?? "")}
						onSelect={(value) => control.change(value?.toISOString() ?? "")}
						initialFocus
					/>
				</PopoverContent>
			</Popover>

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
}
