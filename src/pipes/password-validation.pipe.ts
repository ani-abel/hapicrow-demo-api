/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (value?.Password) {
            //? email validation for email address
            const regExp = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/g;
            if (!regExp.test(value['Password'])) {
                throw new BadRequestException("Invalid Password. Must contain at least 8 characters in all");
            }
        }
        return value;
    }
}