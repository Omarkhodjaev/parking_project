import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { firstValueFrom, from } from 'rxjs'; // Import 'from' function from 'rxjs' for converting Promise to Observable
import { config } from '../../../../common/config';
import { IRequest } from '../../../../common/types/interfaces';
import { UserService } from '../../../../modules/user/user.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ResData } from 'src/lib/resData';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);


    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtKey,
      });

      // Convert the promise to observable using 'from'
      const foundUserObservable = from(
        this.userService.findOneById(payload.id),
      );

      // Destructure 'data' property from the result
      const { data: foundUser } =
        await firstValueFrom<ResData<UserEntity>>(foundUserObservable);
        
        
      request['user'] = foundUser;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
