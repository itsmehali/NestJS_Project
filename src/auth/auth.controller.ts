import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './auth.service';
import { RequestWithUser } from './requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
}
