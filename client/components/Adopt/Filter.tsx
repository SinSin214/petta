'use client';
import { Select, SelectItem, SharedSelection, Selection, Button, Input } from "@heroui/react";
import { useState } from "react";
import { Bot, Search } from 'lucide-react';

type FilterItem = {
  	key: string;
  	text: string;
};

type FilterBox = {
	key: string;
	label: string;
	items: FilterItem[];
	placeholder: string;
	selectedKeys: Selection;
	handler: (keys: SharedSelection) => void;
}

export function Filter() {
	const [typeValues, setTypeValues] = useState<Selection>(new Set([]));
	const [ageValues, setAgeValues] = useState<Selection>(new Set([]));
	const [sizeValues, setSizeValues] = useState<Selection>(new Set([]));

	const petType = [
		{ key: 'all', text: 'All' },
		{ key: 'dog', text: 'Dog' },
		{ key: 'cat', text: 'Cat' },
		{ key: 'rabbit', text: 'Rabbit' },
		{ key: 'bird', text: 'Bird' }
	];

	const petAge = [
		{ key: 'all', text: 'All' },
		{ key: 'new_born', text: 'New born' },
		{ key: 'young', text: 'Young' },
		{ key: 'adult', text: 'Adult' },
	];

	const petSize = [
		{ key: 'all', text: 'All' },
		{ key: 'small', text: 'Small' },
		{ key: 'medium', text: 'Medium' },
		{ key: 'large', text: 'Large' }
	]

	const filterBoxes: FilterBox[] = [
		{key: 'type', label: 'Pet', items: petType, placeholder: 'What type of pet are you looking for ?', selectedKeys: typeValues, handler: setTypeValues},
		{key: 'age', label: 'Age', items: petAge, placeholder: 'How old is your friend ?', selectedKeys: ageValues, handler: setAgeValues},
		{key: 'size', label: 'Size', items: petSize, placeholder: 'Do you like a large or tiny friend ?', selectedKeys: sizeValues, handler: setSizeValues}
	]

	const renderFilters = (filter: FilterBox) => {
        return (
			<Select
				className="col-span-3"
				key={filter.key}
				label={filter.label}
				selectionMode="multiple"
				size="sm"
				labelPlacement="outside"
				placeholder={filter.placeholder}
				onSelectionChange={filter.handler}
				selectedKeys={filter.selectedKeys}
				>
					{filter.items.map((item: {key: string, text: string}) => (
						<SelectItem key={item.key}>{item.text}</SelectItem>
					))}
				</Select>
		)
	};

	return (
		<div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
			<div className="relative">
				<Input
					classNames={{
						base: "max-w-full h-10",
						mainWrapper: "h-full",
						input: "text-small",
						inputWrapper:
						"h-full font-normal text-default-500",
					}}
					placeholder="Describe and AI finds a suitable friend for you..."
					size="sm"
					startContent={<Bot size={24} />}
					type="search"
					/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-10 gap-4">
				{filterBoxes.map((filterBox: FilterBox) => renderFilters(filterBox))}
				<Button  className="self-end" size="sm">
					<Search size={20} />
				</Button>
			</div>
		</div>
	);
}