import { Injectable } from '@nestjs/common';
import { PetSelectionDto } from './dto/pet.dto.js';
import { PetRepository } from './pet.repository.js';

@Injectable()
export class PetService {
    constructor(private petRepository: PetRepository) {}

    async getBySelection(petSelection: PetSelectionDto) {
        const { type_ids, age_type_ids, size_type_ids } = petSelection;

        const res = await this.petRepository.findManyBySelection(type_ids, age_type_ids, size_type_ids);
        return res;
    }

    async getFilterOptions() {
        return this.petRepository.findFilterOptions();
    }
}