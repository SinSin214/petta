import { Transform } from 'class-transformer';

export class PetSelectionDto {
    @Transform(({ value }) => value.toLowerCase())
    pet_type_id: string

    @Transform(({ value }) => value.toLowerCase())
    age_type_id: string

    @Transform(({ value }) => value.toLowerCase())
    size_type_id: string
}