/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class DateCreatedPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (value?.StartDate) {
            if (new Date(value.StartDate).getTime() < new Date().getTime()) {
                throw new BadRequestException("Start date must be greater than current time");
            }
        }
        return value;
    }
}