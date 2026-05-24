'use client';
import { Button, Label, ListBox, Select } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { Bot, Search } from 'lucide-react';
import { getRequest } from "@/services/requestAPI";
import { useI18n } from "@/i18n/I18nProvider";

type FilterItem = {
  	key: string;
  	text: string;
};

type FilterBox = {
	key: string;
	label: string;
	items: FilterItem[];
	selectedKeys: Set<string>;
	handler: (keys: Set<string>) => void;
}

type FilterOptionsResponse = {
	data?: {
		types?: string[];
		ages?: string[];
		sizes?: string[];
	};
};

const ALL_KEY = 'all';
type LookupGroup = 'petType' | 'petAge' | 'petSize' | 'petPersonality';

const mapIdsToFilterItems = (ids: string[], group: LookupGroup, t: (key: string, params?: Record<string, string | number>) => string): FilterItem[] => {
	return ids.map((id) => ({
		key: id,
		text: (() => {
			const key = `${group}.${id}`;
			const translated = t(key);
			return translated === key ? id : translated;
		})(),
	}));
};

const withAllOption = (items: FilterItem[], allText: string): FilterItem[] => [{ key: ALL_KEY, text: allText }, ...items];

const normalizeSelection = (selected: Set<string>, items: FilterItem[]) => {
	const optionKeys = items.filter((item) => item.key !== ALL_KEY).map((item) => item.key);

	if (selected.has(ALL_KEY) || selected.size === 0) {
		return new Set(optionKeys);
	}

	return new Set(Array.from(selected).filter((key) => key !== ALL_KEY));
};

const selectionLabel = (selected: Set<string>, items: FilterItem[], allText: string, selectedCountText: string) => {
	if (selected.has(ALL_KEY) || selected.size === 0) {
		return allText;
	}

	const selectedLabels = items
		.filter((item) => selected.has(item.key) && item.key !== ALL_KEY)
		.map((item) => item.text);

	if (selectedLabels.length === 0) {
		return allText;
	}

	if (selectedLabels.length <= 2) {
		return selectedLabels.join(', ');
	}

	return selectedCountText.replace('{count}', String(selectedLabels.length));
};

const nextSelection = (keys: Set<string>) => {
	if (keys.size === 0 || keys.has(ALL_KEY)) {
		return new Set([ALL_KEY]);
	}

	return new Set(Array.from(keys).filter((key) => key !== ALL_KEY));
};

export function Filter(props: { getAdoptPet: (type: Set<string>, age: Set<string>, size: Set<string>) => void }) {
	const { t } = useI18n();
	const allText = t('filters.all');
	const selectedCountText = t('filters.selectedCount');
	const [typeValues, setTypeValues] = useState<Set<string>>(new Set([ALL_KEY]));
	const [ageValues, setAgeValues] = useState<Set<string>>(new Set([ALL_KEY]));
	const [sizeValues, setSizeValues] = useState<Set<string>>(new Set([ALL_KEY]));
	const [petType, setPetType] = useState<FilterItem[]>([{ key: ALL_KEY, text: allText }]);
	const [petAge, setPetAge] = useState<FilterItem[]>([{ key: ALL_KEY, text: allText }]);
	const [petSize, setPetSize] = useState<FilterItem[]>([{ key: ALL_KEY, text: allText }]);

	useEffect(() => {
		const loadFilterOptions = async () => {
			const response = await getRequest('/pet/filter-options') as FilterOptionsResponse;
			const data = response?.data;

			setPetType(withAllOption(mapIdsToFilterItems(data?.types ?? [], 'petType', t), allText));
			setPetAge(withAllOption(mapIdsToFilterItems(data?.ages ?? [], 'petAge', t), allText));
			setPetSize(withAllOption(mapIdsToFilterItems(data?.sizes ?? [], 'petSize', t), allText));
		};

		void loadFilterOptions();
	}, []);

	const filterBoxes: FilterBox[] = useMemo(() => [
		{key: 'type_ids', label: t('filters.petLabel'), items: petType, selectedKeys: typeValues, handler: setTypeValues},
		{key: 'age_ids', label: t('filters.ageLabel'), items: petAge, selectedKeys: ageValues, handler: setAgeValues},
		{key: 'size_ids', label: t('filters.sizeLabel'), items: petSize, selectedKeys: sizeValues, handler: setSizeValues}
	], [petType, typeValues, petAge, ageValues, petSize, sizeValues, t]);

	const renderFilters = (filter: FilterBox) => {
		const selectedValueLabel = selectionLabel(filter.selectedKeys, filter.items, allText, selectedCountText);

		return (
			<Select
				key={filter.key}
				aria-label={filter.label}
				className="col-span-3 flex flex-col gap-2"
			>
				<Label className="text-sm font-medium text-slate-700">{filter.label}</Label>
				<Select.Trigger className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-amber-400">
					<span className="truncate">{selectedValueLabel}</span>
					<Select.Indicator />
				</Select.Trigger>
				<Select.Popover>
					<ListBox
						selectionMode="multiple"
						selectedKeys={filter.selectedKeys}
						onSelectionChange={(keys) => {
							if (keys === 'all') {
								filter.handler(new Set([ALL_KEY]));
								return;
							}

							filter.handler(nextSelection(new Set(Array.from(keys, (key) => String(key)))));
						}}
						className="max-h-64"
					>
						{filter.items.map((item) => (
							<ListBox.Item key={item.key} id={item.key}>
								{item.text}
							</ListBox.Item>
						))}
					</ListBox>
				</Select.Popover>
			</Select>
		)
	};

	const getAdoptPet = () => {
		props.getAdoptPet(
			normalizeSelection(typeValues, petType),
			normalizeSelection(ageValues, petAge),
			normalizeSelection(sizeValues, petSize)
		);
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
			<div className="relative flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">
				<Bot size={20} />
				<input
					type="search"
					placeholder={t('filters.aiPlaceholder')}
					className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-10 gap-4">
				{filterBoxes.map((filterBox: FilterBox) => renderFilters(filterBox))}
				<Button className="self-end" size="sm" onPress={() => getAdoptPet()} aria-label={t('filters.searchAria')}>
					<Search size={20} />
				</Button>
			</div>
		</div>
	);
}