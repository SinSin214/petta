import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetSelectionDto } from './pet.dto';

@Controller('pets')
export class PetController {
    constructor(private petService: PetService) {}

    @Post('/selection')
    async getPetsByParams(@Body() petSelectionDto: PetSelectionDto) {
        const result = await this.petService.getPetsByParams();
        return {
            data: result
        };
    }
}