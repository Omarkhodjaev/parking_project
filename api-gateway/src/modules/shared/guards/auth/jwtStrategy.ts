import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../../../../common/config';
import { UserService } from '../../../../modules/user/user.service';
import { Observable, firstValueFrom, from, lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtKey,
    });
  }

  async validate(payload: { id: number }) {
    const foundUserObservable: Observable<any> =
      await this.userService.findOneById(payload.id);

    const { data: foundUser } = await firstValueFrom(foundUserObservable);

    return foundUser;
  }
}
