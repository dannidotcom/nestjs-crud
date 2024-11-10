import { Injectable, HttpStatus, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Cryptage du mot de passe avant la création de l'utilisateur
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userDetails = this.userRepository.create({ ...createUserDto, password: hashedPassword });

    // Sauvegarde dans la base de données
    await this.userRepository.save(userDetails);

    return {
      msg: "Data added successfully",
      status: HttpStatus.OK,
      data: userDetails,
    };
  }

  async findAll() {
    let findAll = await this.userRepository.findAndCount();
    console.log(findAll[1])
    if(!findAll) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      totalData : findAll && findAll.length ? findAll[1] :  0,
      result : findAll && findAll[0]
    }
  }

  async findOne(id: any) {
    const findOne = await this.userRepository.findOne({
      where: {
          id: id,
      },
    })
    if(!findOne) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      // totalData : findAll && findAll.length ? findAll.length :  0,
      result : findOne
    }
  }

 async update(id: any, updateUserDto: UpdateUserDto) {
    const result : any = await this.userRepository.update({id }, updateUserDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(id: any) {
    const result : any = await this.userRepository.delete(id);
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

}
