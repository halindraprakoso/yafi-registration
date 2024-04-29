import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
	unstable_useControl as useControl,
	type FieldMetadata,
} from "@conform-to/react";
import { useId, useRef, type ElementRef } from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

type Item = {
	name: string;
	value: string;
};

export const ComboboxConform = ({
	meta,
	items,
	label,
	className,
	...props
}: {
	meta: FieldMetadata<string>;
	items: Item[];
	label?: string;
	className?: string;
}) => {
	const selectRef =
		useRef<ElementRef<typeof PopoverTrigger | typeof DrawerTrigger>>(null);
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
				{items.map((item) => (
					<option key={item.value} value={item.value} />
				))}
			</select>

			<ComboBoxResponsive
				items={items}
				{...props}
				value={control.value ?? ""}
				onValueChange={control.change}
				onOpenChange={(open) => {
					if (!open) {
						control.blur();
					}
				}}
			/>

			{meta.errors && (
				<p className="text-sm text-red-500">{meta.errors.join(", ")}</p>
			)}
		</div>
	);
};

function ComboBoxResponsive({
	items,
	value,
	onValueChange,
	onOpenChange,
}: {
	items: Item[];
	value: string;
	onValueChange: (value: string) => void;
	onOpenChange: (open: boolean) => void;
}) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Popover onOpenChange={onOpenChange}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-[150px] justify-start">
						{value ? <>{value}</> : <>+ Set status</>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<ItemsList
						items={items}
						setOpen={onOpenChange}
						setSelected={onValueChange}
					/>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-[150px] justify-start">
					{value ? <>{value}</> : <>+ Set status</>}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<ItemsList
						items={items}
						setOpen={onOpenChange}
						setSelected={onValueChange}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function ItemsList({
	items,
	setOpen,
	setSelected,
}: {
	items: Item[];
	setOpen: (open: boolean) => void;
	setSelected: (value: string) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{items.map((item) => (
						<CommandItem
							key={item.value}
							value={item.value}
							onSelect={(value) => {
								setSelected(
									items.find((item) => item.value === value)?.value || "",
								);
								setOpen(false);
							}}
						>
							{item.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
