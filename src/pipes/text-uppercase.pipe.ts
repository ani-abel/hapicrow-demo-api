/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TextUppercasePipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (value?.Title && typeof value.Title === "string") {
            //Bring in the user entity
            value['Title'] = (value.Title as string).toUpperCase();
        }
        if (value?.Name && typeof value.Name === "string") {
            //Bring in the user entity
            value['Name'] = (value.Name as string).toUpperCase();
        }
        return value;
    }
}
