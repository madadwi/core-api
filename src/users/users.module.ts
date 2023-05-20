import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from 'src/users/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SchoolYearsModule } from 'src/school-years/school-years.module'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
