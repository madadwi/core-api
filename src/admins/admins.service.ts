import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async validateUnique(dto: CreateAdminDto | UpdateAdminDto, id?: string) {
        const user = await this.usersRepository.findOneBy({
            id,
            type: 'ADMIN',
        })
        // const checkRfid = await this.usersRepository.findOneBy({
        //     rfid: dto.rfid,
        // })
        const checkEmail = await this.usersRepository.findOneBy({
            email: dto.email,
        })
        let errors: string[] = []

        // if (checkRfid && (id ? checkRfid.rfid != user.rfid : true))
        //     errors = [...errors, `User with rfid ${dto.rfid} already exist.`]
        if (checkEmail && (id ? checkEmail.email != user.email : true))
            errors = [...errors, `User with email ${dto.email} already exist.`]

        if (errors.length > 0) throw new BadRequestException(errors)
    }
    async create(createAdminDto: CreateAdminDto) {
        this.validateUnique(createAdminDto)
        return await this.usersRepository.save({
            ...createAdminDto,
            password: await bcrypt.hash(createAdminDto.password, 10),
            type: 'ADMIN',
        })
    }

    async findAll() {
        return await this.usersRepository.find({
            where: {
                type: 'ADMIN',
            },
        })
    }

    async findOne(id: string) {
        return await this.usersRepository.findOneBy({ id, type: 'ADMIN' })
    }

    async update(id: string, updateAdminDto: UpdateAdminDto) {
        this.validateUnique(updateAdminDto, id)

        if (updateAdminDto.password)
            updateAdminDto = {
                ...updateAdminDto,
                password: await bcrypt.hash(updateAdminDto.password, 10),
            }

        return await this.usersRepository.update(
            { id, type: 'ADMIN' },
            updateAdminDto,
        )
    }

    async remove(id: string) {
        return await this.usersRepository.delete({ id, type: 'ADMIN' })
    }
}
