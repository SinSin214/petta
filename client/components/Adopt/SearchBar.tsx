'use client';
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export function SearchBar() {
	const [typeValues, setTypeValues] = useState<String[]>([]);
	const [ageValues, setAgeValues] = useState<String[]>([]);
	const [sizeValues, setSizeValues] = useState<String[]>([]);

	const isShowClear = typeValues.includes('all') || ageValues.includes('all') || sizeValues.includes('all');

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

	const onTypeFilterChange = (keys: String[]) => {
		setTypeValues(Array.from(keys));
	}
	const onAgeFilterChange = () => { }
	const onSizeFilterChange = () => { }

	const filterBoxes = [
		{key: 'type', label: 'Type', items: petType, selectedKeys: typeValues, handler: onTypeFilterChange},
		{key: 'age', label: 'Age', items: petAge, selectedKeys: ageValues, handler: onAgeFilterChange},
		{key: 'size', label: 'Size', items: petSize, selectedKeys: sizeValues, handler: onSizeFilterChange}
	]

	const onClearFilters = () => {

	}

	const renderFilters = (filter) => {
        return (
			<Select
				key={filter.key}
					label={filter.label}
					selectionMode="multiple"
					size="sm"
					onSelectionChange={filter.handler}
					selectedKeys={filter.selectedKeys}
				>
					{filter.items.map((item) => (
						<SelectItem key={item.key}>{item.text}</SelectItem>
					))}
				</Select>
		)
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
			<div className="flex items-center justify-between">
				<h3>Find Your Perfect Match</h3>
				{isShowClear && (
          <Button variant="ghost" size="sm" onPress={onClearFilters}>
            Clear Filters
          </Button>
        )}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{filterBoxes.map(filterBox => renderFilters(filterBox))}
			</div>
		</div>
	);
}