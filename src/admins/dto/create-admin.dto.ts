import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateAdminDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @ApiProperty()
    description: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    password: string
}
