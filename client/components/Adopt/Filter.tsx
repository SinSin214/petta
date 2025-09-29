'use client';
import { Select, SelectItem, SharedSelection, Selection, Button } from "@heroui/react";
import { useState } from "react";

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
		{key: 'age', label: 'Age', items: petAge, placeholder: 'How old should it be ?', selectedKeys: ageValues, handler: setAgeValues},
		{key: 'size', label: 'Size', items: petSize, placeholder: 'Do you like a large or tiny friend ?', selectedKeys: sizeValues, handler: setSizeValues}
	]

	const renderFilters = (filter: FilterBox) => {
        return (
			<Select
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
		<div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{filterBoxes.map((filterBox: FilterBox) => renderFilters(filterBox))}
			</div>
			<Button />
		</div>
	);
}