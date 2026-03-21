import { Injectable } from '@nestjs/common';
import { PetSelectionDto } from './dto/pet.dto';
import { PetRepository } from './pet.repository';

@Injectable()
export class PetService {
    constructor(private petRepository: PetRepository) {}

    async getBySelection(petSelection: PetSelectionDto) {
        const { type_id, age_type_id, size_type_id } = petSelection;

        const res = await this.petRepository.findManyBySelection(type_id, age_type_id, size_type_id);
        return res;
    }
}