import { Body, Controller, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetSelectionDto } from './dto/pet.dto';

@Controller('pet')
export class PetController {
    constructor(private petService: PetService) {}

    @Post('selection')
    async getBySelection(@Body() petSelectionDto: PetSelectionDto) {
        console.log(petSelectionDto);
        const result = await this.petService.getBySelection(petSelectionDto);
        return {
            data: result
        };
    }
}