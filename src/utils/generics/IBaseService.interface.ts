/* eslint-disable prettier/prettier */
import { Logger } from "@nestjs/common";

export interface IBaseService<T> {
    readonly loggerLabel: string;

    create(object: Partial<Record<keyof T, unknown>>): Promise<T>;

    createMany(objects: Array<Partial<Record<keyof T, unknown>>>): Promise<Array<T>>;

    find(): Promise<Array<T>>;

    findConditionally(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown>,
        options: Record<string, unknown>,
    ): Promise<Array<T>>;

    findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown>,
        options: Record<string, unknown>,
    ): Promise<T>;

    findAndCountByCondition(
        conditions: Partial<Record<keyof T, unknown>>
    ): Promise<number>;

    findAndCountAll(): Promise<number>;

    findOneById(id: string): Promise<T>;

    deleteOne(
        conditions: Partial<Record<keyof T, unknown>>,
        options: Record<string, unknown>,
    ): Promise<void>;

    deleteMany(
        conditions: Partial<Record<keyof T, unknown>>,
        options: Record<string, unknown>,
    ): Promise<void>;

    // updateOne(
    //     conditions: Partial<Record<keyof T, unknown>>,
    //     payload: Partial<Record<keyof T, unknown>>,
    // ): Promise<void>;

    //? Returns one instance of the logger object to be used all over the app
    getLogger(): Logger;
}