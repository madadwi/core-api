import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class CreateSchoolYearDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @ApiProperty()
    start_date: string

    @IsNotEmpty()
    @ApiProperty()
    end_date: string

    @IsBoolean()
    @ApiProperty()
    status: boolean
}
