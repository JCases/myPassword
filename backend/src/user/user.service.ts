import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from Google';
    }

    return {
      user: req.user,
    };
  }
}
