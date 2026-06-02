import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetService } from './pet.service.js';
import { PetSelectionDto } from './dto/pet.dto.js';
import { Throttle } from '@nestjs/throttler';

 // 20 requests per minute per IP for all pet endpoints
@Throttle({ default: { ttl: 60_000, limit: 20 } })
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
        const result = await this.petService.getBySelection(petSelectionDto);
        return {
            data: result
        };
    }
}