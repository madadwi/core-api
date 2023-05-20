import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateScanDto } from './dto/update-scan.dto'
import { Scan } from 'src/scans/entities/scan.entity'
import { MachinesService } from './../machines/machines.service'
import { UsersService } from './../users/users.service'
import { CreateScanDto } from './dto/create-scan.dto'

@Injectable()
export class ScansService {
    constructor(
        @InjectRepository(Scan)
        private scansRepository: Repository<Scan>,
        private readonly machinesService: MachinesService,
        private readonly usersService: UsersService,
    ) {}

    currentDate() {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()

        return yyyy + '-' + mm + '-' + dd
    }

    async scan(machine: string, rfid: string) {
        const date = this.currentDate()

        const checkMac = await this.machinesService.findByAdress(machine)
        const checkUser = await this.usersService.findByRfid(rfid)
        const checkScanIn = await this.scansRepository.findOneBy({
            rfid,
            status: 'IN',
            date,
        })
        const checkScanOut = await this.scansRepository.findOneBy({
            rfid,
            status: 'OUT',
            date,
        })

        if (!checkMac)
            Logger.error(
                `Machine ${machine} not registered!`,
                'GakKedaftarBang',
            )

        if (!checkUser)
            Logger.error(`RFID ${rfid} not registered!`, 'GakKedaftarBang')

        const payload: CreateScanDto = {
            address: machine,
            machine: checkMac,
            rfid,
            user: checkUser,
            date,
            status: 'ROOM',
        }

        if (checkMac && checkMac.is_attendance) {
            if (!checkScanIn) payload.status = 'IN'
            if (checkScanIn && !checkScanOut) payload.status = 'OUT'

            if (!checkScanIn || !checkScanOut) {
                await this.scansRepository.save(payload)
                Logger.error('Berhasil absen masuk', 'ApaIyaBangMessi')
            }
        } else if (checkScanIn && !checkScanOut) {
            await this.scansRepository.save(payload)
            Logger.error('Berhasil absen ruangan', 'ApaIyaBangMessi')
        }
    }

    async findAll(type) {
        return await this.scansRepository.find({
            relations: { user: { major: true }, machine: true },
            where: {
                user: { type },
            },
        })
    }
}
