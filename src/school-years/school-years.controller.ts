import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { SchoolYearsService } from './school-years.service'
import { CreateSchoolYearDto } from './dto/create-school-year.dto'
import { UpdateSchoolYearDto } from './dto/update-school-year.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('school-years')
export class SchoolYearsController {
    constructor(private readonly schoolYearsService: SchoolYearsService) {}

    @Post()
    create(@Body() createSchoolYearDto: CreateSchoolYearDto) {
        return this.schoolYearsService.create(createSchoolYearDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('active')
    active() {
        return this.schoolYearsService.active()
    }

    @Get()
    findAll() {
        return this.schoolYearsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schoolYearsService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSchoolYearDto: UpdateSchoolYearDto,
    ) {
        return this.schoolYearsService.update(id, updateSchoolYearDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.schoolYearsService.remove(id)
    }
}
