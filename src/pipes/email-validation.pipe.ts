/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class EmailValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (value?.Email) {
            //? email validation for email address
            const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regExp.test(value['Email'])) {
                throw new BadRequestException("Invalid Email address");
            }
        }
        return value;
    }
}