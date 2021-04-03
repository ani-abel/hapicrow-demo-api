/* eslint-disable prettier/prettier */
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export class IDSetup {
    @ApiProperty()
    @Prop()
    _id: string;
}


export type TodoDocument = Todo & Document;

@Schema()
export class Todo extends IDSetup {
    @ApiProperty()
    @Prop()
    Title: string;

    @ApiProperty()
    @Prop()
    StartDate: Date;

    @ApiProperty()
    @Prop({
        default: Date.now
    })
    DateCreated: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
