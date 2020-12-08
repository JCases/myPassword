import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { IRequest } from 'src/shared/interfaces/request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(protected userService: UserService) {}
}
