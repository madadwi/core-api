import { Module } from '@nestjs/common'
import { AdminsService } from './admins.service'
import { AdminsController } from './admins.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AdminsController],
    providers: [AdminsService],
})
export class AdminsModule {}
