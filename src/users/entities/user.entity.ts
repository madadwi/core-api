import { Scan } from './../../scans/entities/scan.entity'
import { Region } from './../../regions/entities/region.entity'
import { Class } from './../../classes/entities/class.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Major } from 'src/majors/entities/major.entity'
import { SchoolYear } from 'src/school-years/entities/school-year.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, nullable: true })
    rfid: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true, nullable: true })
    nis: string

    @Column({ unique: true, nullable: true })
    nip: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({ nullable: true })
    division: string

    @Column({ nullable: true })
    description: string

    @Column({ type: 'enum', enum: ['TEACHER', 'STUDENT', 'STAFF', 'ADMIN'] })
    type: string

    @ManyToOne(() => Major, (Major) => Major.students, { nullable: true })
    major: Major

    // @ManyToOne(() => Class, (Class) => Class.students, { nullable: true })
    // class: Class

    @ManyToOne(() => Region, (region) => region.students, { nullable: true })
    region: Region

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Scan, (scan) => scan.user)
    scans: Scan[]

    // @ManyToOne(() => SchoolYear, (school_year) => school_year.users)
    // school_year: SchoolYear
}
