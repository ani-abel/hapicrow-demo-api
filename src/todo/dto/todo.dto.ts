/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Todo } from '../../schemas/todo.schema';

export class CreateTodoDTO {
    @ApiProperty()
    Title: string;

    @ApiProperty()
    StartDate: Date;
}

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
    @ApiProperty()
    Id: string;
}

export class TodoDTO {
    @ApiProperty()
    Id: string;

    @ApiProperty()
    Title: string;

    @ApiProperty()
    StartDate: Date;

    @ApiProperty()
    DateCreated: Date;
}

export const mapTodoToDTO = (payload: Todo | Todo[]): TodoDTO | TodoDTO[] => {
    if (Array.isArray(payload)) {
        return payload.map((data) => {
            const { _id, Title, DateCreated, StartDate } = data;
            return {
                Id: _id,
                Title,
                DateCreated,
                StartDate
            }
        });
    }
    else {
        const { _id, Title, DateCreated, StartDate } = payload;
        return {
            Id: _id,
            Title,
            DateCreated,
            StartDate
        };
    }
}