import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../../../../common/config';
import { UserService } from '../../../../modules/user/user.service';
import { firstValueFrom, from } from 'rxjs';
import { ICurrentUser } from '../../../../common/types/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtKey,
    });
  }

  async validate(payload: { id: number }): Promise<ICurrentUser> {
    const foundUserObservable = from(this.userService.findOneById(payload.id));

    const { data: foundUser } = await firstValueFrom(foundUserObservable);

    return foundUser;
  }
}
