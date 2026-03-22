import { Transform } from 'class-transformer';
import { IsString } from "class-validator"

export class PetSelectionDto {
    type_ids: string[]

    age_type_ids: string[]

    size_type_ids: string[]
}