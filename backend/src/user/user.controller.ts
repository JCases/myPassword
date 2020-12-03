import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { IRequest } from '../shared/interfaces/request';

@Controller('user')
export class UserController {
  constructor(protected userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: IRequest) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: IRequest) {
    return this.userService.googleLogin(req);
  }
}
