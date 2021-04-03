import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortByKeys } from '../utils/functions/shared.functions';
import { Response } from "./response.interface";

@Injectable()
export class SortDataInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private readonly logger: Logger = new Logger();

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        try {
            return next.handle().pipe(
                map(value => {
                    if (Array.isArray(value) && value?.length > 0) {
                        // console.log(value.length);
                        // const dateExists: any[] = value.filter(dt => "DateCreated" in dt);
                        // console.log(dateExists.length);
                        //Array
                        const returnedArray: any[] = [];
                        if ('DateCreated' in value[0]) {
                            //Sort
                            const sortedArray: any[] = sortByKeys(value, '-DateCreated');
                            returnedArray.push(...sortedArray);
                        }
                    }
                    return value;
                }),
            );
        }
        catch (ex) {
            this.logger.debug(ex);
            throw ex;
        }
    }
}
