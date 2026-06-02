import { Transform } from 'class-transformer';
import { IsArray, IsString } from "class-validator";

export class PetSelectionDto {
    @IsString({ each: true })
    type_ids: string[]

    @IsString({ each: true })
    age_type_ids: string[]

    @IsString({ each: true })
    size_type_ids: string[]
}