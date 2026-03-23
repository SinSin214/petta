import { Transform } from 'class-transformer';
import { IsArray, IsString } from "class-validator";

export class PetSelectionDto {
    @IsString({ each: true })
    @Transform(({ value }) => value.toLowerCase())
    type_ids: string[] | undefined

    @IsString({ each: true })
    @Transform(({ value }) => value.toLowerCase())
    age_type_ids: string[] | undefined

    @IsString({ each: true })
    @Transform(({ value }) => value.toLowerCase())
    size_type_ids: string[] | undefined
}