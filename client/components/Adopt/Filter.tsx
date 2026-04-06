'use client';
import { Button } from "@heroui/react";
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
	selectedKeys: Set<string>;
	handler: (keys: Set<string>) => void;
}

export function Filter(props: { getAdoptPet: (type: Set<string>, age: Set<string>, size: Set<string>) => void }) {
	const [typeValues, setTypeValues] = useState<Set<string>>(new Set());
	const [ageValues, setAgeValues] = useState<Set<string>>(new Set());
	const [sizeValues, setSizeValues] = useState<Set<string>>(new Set());

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
		{key: 'type_ids', label: 'Pet', items: petType, placeholder: 'What type of pet are you looking for ?', selectedKeys: typeValues, handler: setTypeValues},
		{key: 'age_ids', label: 'Age', items: petAge, placeholder: 'How old is your friend ?', selectedKeys: ageValues, handler: setAgeValues},
		{key: 'size_ids', label: 'Size', items: petSize, placeholder: 'Do you like a large or tiny friend ?', selectedKeys: sizeValues, handler: setSizeValues}
	]

	const renderFilters = (filter: FilterBox) => {
        const selectedValues = Array.from(filter.selectedKeys);

        return (
			<label className="col-span-3 flex flex-col gap-2" key={filter.key}>
				<span className="text-sm font-medium text-slate-700">{filter.label}</span>
				<select
					multiple
					value={selectedValues}
					onChange={(event) => {
						const nextValue = new Set(Array.from(event.currentTarget.selectedOptions, (option) => option.value));
						filter.handler(nextValue);
					}}
					className="min-h-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-amber-400"
				>
					{filter.items.map((item) => (
						<option key={item.key} value={item.key}>{item.text}</option>
					))}
				</select>
			</label>
		)
	};

	const getAdoptPet = () => {
		props.getAdoptPet(typeValues, ageValues, sizeValues);
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
			<div className="relative flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
				<Bot size={20} />
				<input
					type="search"
					placeholder="Describe and AI finds a suitable friend for you..."
					className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-10 gap-4">
				{filterBoxes.map((filterBox: FilterBox) => renderFilters(filterBox))}
				<Button className="self-end" size="sm" onPress={() => getAdoptPet()}>
					<Search size={20} />
				</Button>
			</div>
		</div>
	);
}