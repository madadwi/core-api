import { Class } from 'src/classes/entities/class.entity'
import { Major } from 'src/majors/entities/major.entity'
import { Region } from 'src/regions/entities/region.entity'
import { User } from 'src/users/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
@Entity()
export class SchoolYear {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    start_date: string

    @Column()
    end_date: string

    @Column()
    status: boolean

    @OneToMany(() => Class, (Class) => Class.school_year)
    classes: Class[]

    @OneToMany(() => Major, (Major) => Major.school_year)
    majors: Major[]

    @OneToMany(() => Region, (Region) => Region.school_year)
    regions: Region[]

    // @OneToMany(() => User, (User) => User.school_year)
    // users: User[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
