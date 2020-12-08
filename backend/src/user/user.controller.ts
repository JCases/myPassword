import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './../../../global';
import { encode } from '../auth/auth';
import { IsLoggedGuard } from '../shared/guards/isLogged.guard';
import { IRequest } from 'src/shared/interfaces/request';

@Controller('user')
export class UserController {
  constructor(protected userService: UserService) {}

  @Post('login')
  public async login(@Body() body: IUser) {
    if (!body.email)
      throw new HttpException('Email es requerido', HttpStatus.NOT_ACCEPTABLE);
    return {
      token: encode(await this.userService.login(body)),
    };
  }

  @Get('token')
  @UseGuards(IsLoggedGuard)
  public token() {
    return true;
  }

  @Post('register')
  public async register(@Body() body: IUser) {
    return {
      token: encode(await this.userService.register(body)),
    };
  }

  @Get('rehydrate')
  @UseGuards(IsLoggedGuard)
  public async rehydrate(@Req() req: IRequest) {
    return {
      token: encode(await this.userService.rehydrate(req.user)),
    };
  }
}
