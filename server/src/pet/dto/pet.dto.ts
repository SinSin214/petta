import { Transform } from 'class-transformer';
import { IsString } from "class-validator"

export class PetSelectionDto {
    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    type_id: string

    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    age_type_id: string

    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    size_type_id: string
}