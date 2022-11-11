import { Request } from 'express';
import { User } from 'src/users/entitites/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
