import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetService } from './pet.service.js';
import { PetSelectionDto } from './dto/pet.dto.js';

@Controller('pet')
export class PetController {
    constructor(private petService: PetService) {}

    @Get('filter-options')
    async getFilterOptions() {
        const result = await this.petService.getFilterOptions();
        return {
            data: result
        };
    }

    @Post('selection')
    async getBySelection(@Body() petSelectionDto: PetSelectionDto) {
        console.log(petSelectionDto);
        const result = await this.petService.getBySelection(petSelectionDto);
        return {
            data: result
        };
    }
}