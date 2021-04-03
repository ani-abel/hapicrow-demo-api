/* eslint-disable prettier/prettier */
import {
    Controller,
    Body,
    Post,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import {
    ApiConsumes,
    ApiOperation,
    ApiProduces,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from './dto/todo.dto';
import { DateCreatedPipe } from '../pipes/date-created.pipe';
import { CustomAPIType } from '../utils/types/shared.types';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoSrv: TodoService
    ) { }

    @ApiOperation({
        description: 'Create task',
    })
    @ApiProduces('json')
    @ApiConsumes('application/json')
    @ApiResponse({
        type: TodoDTO,
    })
    @Post("/create-todo")
    async createTodo(@Body(new DateCreatedPipe()) payload: CreateTodoDTO): Promise<TodoDTO> {
        return await this.todoSrv.createTodo(payload);
    }


    @ApiOperation({
        description: 'Find all tasks',
    })
    @ApiProduces('json')
    @ApiConsumes('application/json')
    @ApiResponse({
        type: [TodoDTO],
    })
    @Get("/find-todos")
    async findTodos(): Promise<TodoDTO[]> {
        return await this.todoSrv.findTodos();
    }

    @ApiOperation({
        description: 'Find single task',
    })
    @ApiProduces('json')
    @ApiConsumes('application/json')
    @ApiResponse({
        type: TodoDTO,
    })
    @Get('/find-todo/:todoId')
    async findTodoById(@Param('todoId') todoId: string): Promise<TodoDTO> {
        return await this.todoSrv.findTodoById(todoId);
    }

    @ApiOperation({
        description: 'Delete task',
    })
    @ApiProduces('json')
    @ApiConsumes('application/json')
    @ApiResponse({
        type: CustomAPIType,
    })
    @Delete('/delete-todo/:todoId')
    async deleteTodo(@Param('todoId') todoId: string): Promise<CustomAPIType> {
        return await this.todoSrv.deleteTodo(todoId);
    }

    @ApiOperation({
        description: 'Update task',
    })
    @ApiProduces('json')
    @ApiConsumes('application/json')
    @ApiResponse({
        type: CustomAPIType,
    })
    @Patch("/update-todo")
    async updateTodo(@Body(new DateCreatedPipe()) payload: UpdateTodoDTO): Promise<CustomAPIType> {
        return await this.todoSrv.updateTodo(payload);
    }
}
