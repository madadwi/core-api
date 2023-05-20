import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSchoolYearDto } from './dto/create-school-year.dto'
import { UpdateSchoolYearDto } from './dto/update-school-year.dto'
import { SchoolYear } from './entities/school-year.entity'

@Injectable()
export class SchoolYearsService {
    constructor(
        @InjectRepository(SchoolYear)
        private schoolyearsRepository: Repository<SchoolYear>,
    ) {}
    async create(createSchoolYearDto: CreateSchoolYearDto) {
        return await this.schoolyearsRepository.save(createSchoolYearDto)
    }

    async findAll() {
        return await this.schoolyearsRepository.find()
    }

    async active() {
        return await this.schoolyearsRepository.findOne({
            where: { status: true },
        })
    }

    async findOne(id: string) {
        try {
            return await this.schoolyearsRepository.findOneByOrFail({ id })
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async update(id: string, updateSchoolYearDto: UpdateSchoolYearDto) {
        return await this.schoolyearsRepository.update(
            { id },
            updateSchoolYearDto,
        )
    }

    async remove(id: string) {
        return await this.schoolyearsRepository.delete({ id })
    }
}
