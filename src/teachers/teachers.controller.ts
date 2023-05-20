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
import { TeachersService } from './teachers.service'
import { CreateTeacherDto } from './dto/create-teacher.dto'
import { UpdateTeacherDto } from './dto/update-teacher.dto'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}

    @Post()
    async create(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teachersService.create(createTeacherDto)
    }

    @Get()
    findAll() {
        return this.teachersService.findAll()
    }
    // @Get()
    // findAll(@Param('schoolYearId') schoolYearId: string) {
    //     return this.teachersService.findAll(schoolYearId)
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teachersService.findOne(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTeacherDto: UpdateTeacherDto,
    ) {
        return this.teachersService.update(id, updateTeacherDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.teachersService.remove(id)
    }
}
