/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    Logger,
    InternalServerErrorException
} from '@nestjs/common';
import {
    Document,
    FilterQuery,
    Model
} from 'mongoose';
import { IBaseService } from "./IBaseService.interface";

/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */
@Injectable()
export abstract class BaseService<T extends Document> implements IBaseService<T> {
    private readonly modelName: string;
    private readonly serviceLogger: Logger;

    /**
     * The constructor must receive the injected model from the child service in
     * order to provide all the proper base functionality.
     *
     * @param {Logger} logger - The injected logger.
     * @param {Model} model - The injected model.
     */
    constructor(
        private readonly model: Model<T>,
        readonly loggerLabel: string,
    ) {
        // Services who extend this service already contain a property called
        // 'logger' so we will assign it to a different name.
        this.serviceLogger = new Logger(loggerLabel);

        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }

    /**
     * 
     * @param object 
     * @throws InternalServerErrorException
     */
    async create(object: Partial<Record<keyof T, unknown>>): Promise<T> {
        try {
            const createdModel: T = new this.model(object);
            return createdModel.save();
        }
        catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new InternalServerErrorException();
        }
    }

    /**
     * 
     * @param objects 
     * @throws InternalServerErrorException
     */
    async createMany(objects: Array<Partial<Record<keyof T, unknown>>>): Promise<Array<T>> {
        try {
            const createdModels: T[] = [];
            for (const object of objects) {
                const createdModel: T = new this.model(object);
                createdModel.save();
                createdModels.push(createdModel);
            }
            return createdModels;
        }
        catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new InternalServerErrorException();
        }
    }

    /**
     * Find all entry and return the result.
     *
     * @throws NotFoundException
     */
    async find(): Promise<Array<T>> {
        try {
            return await this.model.find({});
        } catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Find all entries based on a condition and return the result.
     *
     * @throws NotFoundException
     */
    async findConditionally(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown> = {},
        options: Record<string, unknown> = {},
    ): Promise<Array<T>> {
        try {
            return await this.model.find(
                conditions as FilterQuery<T>,
                projection,
                options,
            );
        } catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Find one entry and return the result.
     *
     * @throws NotFoundException
     */
    async findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown> = {},
        options: Record<string, unknown> = {},
    ): Promise<T> {
        try {
            return await this.model.findOne(
                conditions as FilterQuery<T>,
                projection,
                options,
            );
        } catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Find one entry and return the result.
     *@param {string} id
     * @throws NotFoundException
     */
    async findOneById(id: string): Promise<T> {
        try {
            return await this.model.findById(id);
        } catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Finds entries and returns the count as result
     * @throws NotFoundException
     */
    async findAndCountByCondition(
        conditions: Partial<Record<keyof T, unknown>>
    ): Promise<number> {
        try {
            return await this.model.countDocuments(
                conditions as FilterQuery<T>
            );
        }
        catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Count all enties and return
     * @throws NotFoundException
     */
    async findAndCountAll(): Promise<number> {
        try {
            return await this.model.countDocuments({});
        }
        catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Finds and deletes a single record
     * @param conditions 
     * @param options 
     * @throws NotFoundException
     */
    async deleteOne(
        conditions: Partial<Record<keyof T, unknown>>,
        options: Record<string, unknown> = {},
    ): Promise<void> {
        try {
            await this.model.deleteOne(
                conditions as FilterQuery<T>,
                options
            );
        }
        catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    /**
     * Finds and deletes a single record
     * @param conditions 
     * @param options 
     * @throws NotFoundException
     */
    async deleteMany(
        conditions: Partial<Record<keyof T, unknown>>,
        options: Record<string, unknown> = {},
    ): Promise<void> {
        try {
            await this.model.deleteMany(
                conditions as FilterQuery<T>,
                options
            );
        }
        catch (err) {
            this.serviceLogger.error(`Could not find ${this.modelName} entry:`);
            this.serviceLogger.error(err);
            throw new NotFoundException();
        }
    }

    //? Exposes the document of one to service to another
    getDocumentModel(): Model<T> {
        return this.model;
    }

    getLogger(): Logger {
        return this.serviceLogger;
    }
}