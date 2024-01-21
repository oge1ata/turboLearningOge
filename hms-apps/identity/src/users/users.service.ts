import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, PaginationDto, UpdateUserDto, Users } from '@common/hms-lib';
// import { User as UserProps} from '@common/hms-lib';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, FindOneOptions} from 'typeorm';
// import { FindOneOptions } from 'typeorm';
   

@Injectable()
export class UsersService implements OnModuleInit{

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  //static user data for demo purpose only
  private readonly users:User[] = [];

  onModuleInit() {
      // for (let i=0; i <= 100; i++){
      //   let createUserDto: CreateUserDto = {
      //     primaryEmailAddress: `piosystems${i}@yahoo.co.uk`,
      //     passwordHash: randomUUID(),
      //     firstName: `Pio${i}`,
      //     lastName: `Systems${i}`
      //   }
      //   this.create(createUserDto)
      // }
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({ //these should be from entity
      ...createUserDto,
      id: randomUUID(),
      primaryEmailAddress: createUserDto.primaryEmailAddress,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      backupEmailAddress: '',
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
      passwordHash: randomUUID()
    });
    
    return this.userRepository.save(user);
  }

  async findAll(): Promise<Users> {
    const users = await this.userRepository.find();
    return { users };
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: {id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}});
    if (user) {
      this.userRepository.merge(user, updateUserDto);
      return this.userRepository.save(user);
    }
    throw new NotFoundException(`User not found by id ${id}`);
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}});
    if (user) {
      await this.userRepository.remove(user);
      return user;
    }
    throw new NotFoundException(`User not found by id ${id}`);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users>{
    const subject = new Subject<Users>();
    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip)
      });
    
    };

    const onComplete = () => subject.complete();

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete
    });

    return subject.asObservable();
    // return someObservable;

  }

  async findOneUserByPrimaryEmailAddress(primaryEmailAddress: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: {primaryEmailAddress} });
  }
}
