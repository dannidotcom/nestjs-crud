import { Controller, Get, Post, Body, Query, Res , Req, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Post()
  async create(@Req() req:Request, @Res() res: Response,@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createProductDto);
    let createData = await this.usersService.create(createUserDto);
    return res.send(createData);
  }

  @Get()
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any = await this.usersService.findAll();
    return res.send(findAll);
  }

  @Get('/getOne')
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne = await this.usersService.findOne(id);
    return res.send(getOne)
  }

  @Put('/update')
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let updateData = await this.usersService.update(id, updateUserDto);
    return res.send(updateData);
  }

  @Delete('/delete')
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: string) {
    let deleteData = await  this.usersService.remove(id);
    return res.send(deleteData);
  }
}
