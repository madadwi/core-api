import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ScansService } from './scans.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('scans')
@Controller('scans')
export class ScansController {
    constructor(private readonly scansService: ScansService) {}
    @Get()
    findAll(@Query('type') type) {
        return this.scansService.findAll(type)
    }
}
