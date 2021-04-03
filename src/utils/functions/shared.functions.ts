/* eslint-disable prettier/prettier */
import { BadRequestException, Logger } from "@nestjs/common";
// import * as sendGrid from "@sendgrid/mail";
// import * as crypto from "crypto";
// import * as bcrypt from 'bcryptjs';
// import * as xlsx from 'xlsx';
import * as fs from "fs";
// import * as AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
import * as dotenv from "dotenv";
import { CustomAPIType } from '../types/shared.types';
import { OperationType, EmailSubject } from "../types/app.constants";

dotenv.config();

const {
    SENDGRID_API_KEY,
    SENDGRID_VERIFIED_SENDER_EMAIL,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    BUCKET_NAME,
    KEY_NAME
} = process.env;

const logger: Logger = new Logger("Function-Utils");

export const groupBy = (objectArray: any[], property: string | number): any => {
    return objectArray.reduce(function (acc, obj) {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
};

//? Sorting algorithm
//? Define Error messages.
const ERROR_REQUIRES_AT_LEAST_ONE_KEY = 'provide at least one key to sort by';
const ERROR_KEY_LENGTH_INVALID = 'a key was provided as an empty string';
const ERROR_DESC_KEY_LENGTH_INVALID =
    'a descending key was missing the key name';
const ERROR_OBJECT_DOESNT_CONTAIN_KEY =
    'a key you are attempting to sort by is not on all objects';

/**
 *  Recursive function to sort values by their keys.
 */
const sortByKey = <T>(a: T, b: T, ...keys: string[]): number => {
    // Get first key in array.
    let key = keys.shift();

    // Make sure we have a valid key name.
    if (!key.length) {
        throw new Error(ERROR_KEY_LENGTH_INVALID);
    }

    // Default to ascending order.
    let desc = false;

    // Check for descending sort.
    if (key.charAt(0) === '-') {
        // Make sure key has a name as well as the minus sign.
        if (key.length < 2) {
            throw new Error(ERROR_DESC_KEY_LENGTH_INVALID);
        }

        // Remove minus from key name.
        key = key.substr(1);

        // Flag as descending order.
        desc = true;
    }

    // Make sure the objects both have the key. We make sure
    // to check this after we have removed the minus sign.
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        throw new Error(ERROR_OBJECT_DOESNT_CONTAIN_KEY);
    }

    // Determine checks based on asc / desc.
    const direction = desc ? -1 : 1;

    // Perform bubble sort based on the values.
    if (a[key] > b[key]) {
        return 1 * direction;
    }
    if (a[key] < b[key]) {
        return -1 * direction;
    }

    // The values of the current key are equal, so if we still
    // have keys to check recursively, check the next key.
    if (keys.length) {
        return sortByKey(a, b, ...keys);
    }

    // All keys returned and no more sorting needed.
    return 0;
};

/**
 * Wrapper sort function for the recursive one.
 */
export const sortByKeys = <T>(data: T[], ...keys: string[]): T[] => {
    // Make sure we have at least one key to sort by.
    if (!keys.length) {
        throw new Error(ERROR_REQUIRES_AT_LEAST_ONE_KEY);
    }

    // Sort data.
    data.sort((a: T, b: T): number => {
        return sortByKey(a, b, ...keys);
    });

    // Return sorted data.
    return data;
};

//? Upload files to AWS
// export const uploadFileToStorageBucket = async (
//     filePath: string,
//     deleteAfterUpload = false,
// ): Promise<string> => {
//     try {
//         const awsConfigOptions: any = {
//             accessKeyId: (ACCESS_KEY_ID as string).trim(),
//             secretAccessKey: (SECRET_ACCESS_KEY as string).trim(),
//         };
//         const s3: AWS.S3 = new AWS.S3(awsConfigOptions);
//         //? Create a readstream for the uploaded files
//         const createdReadStream = fs.createReadStream(filePath);

//         //? Create AWS Params object
//         const awsBucketParams: any = {
//             Bucket: (BUCKET_NAME as string).trim(),
//             Key: `${(KEY_NAME as string).trim()}/${filePath}`,
//             Body: createdReadStream,
//         };

//         //? Upload file to AWS storage bucket
//         const result = await s3.upload(awsBucketParams).promise();

//         if (result && deleteAfterUpload) {
//             fs.unlinkSync(filePath);
//         }
//         return result.Location;
//     } catch (ex) {
//         logger.error(ex);
//         throw ex;
//     }
// };

//? Rip data from excel sheets
// export const extractExcelSheetData = <T>(path: string): T[] => {
//     try {
//         let errorMessage: string;
//         const excelSheetRead = xlsx.readFile(path, { cellDates: true });
//         if (excelSheetRead.SheetNames?.length > 0) {
//             const sheetName: string = excelSheetRead.SheetNames[0];
//             const targetExcelSheet: string = excelSheetRead.SheetNames.find((s: string) => s === sheetName);
//             if (targetExcelSheet) {
//                 const excelWorkSheet: xlsx.WorkSheet = excelSheetRead.Sheets[sheetName];
//                 const extractedContent: T[] = xlsx.utils.sheet_to_json(excelWorkSheet);
//                 //Delete the uploaded File after reading
//                 fs.unlinkSync(path);
//                 return extractedContent;
//             }
//         }
//         else {
//             errorMessage = 'This file does not contain any sheets';
//         }

//         //Delete the uploaded File after reading
//         fs.unlinkSync(path);
//         if (errorMessage) {
//             logger.error(errorMessage);
//             throw new BadRequestException(errorMessage);
//         }
//     }
//     catch (ex) {
//         logger.error(ex);
//         throw ex;
//     }
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeKeyFromObject = (obj: any, keys: string[]): any => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (typeof obj[prop]) {
                case 'object':
                    if (keys.indexOf(prop) > -1) {
                        delete obj[prop];
                    } else {
                        //? this handle nested objects
                        //? throws Range call stack exceed error
                        //? Todo, find a fix for this
                        //removeKeyFromObject(obj[prop], keys);
                    }
                    break;
                default:
                    if (keys.indexOf(prop) > -1) {
                        delete obj[prop];
                    }
                    break;
            }
        }
    }
    return obj;
};

export const checkIfArrayFieldAlreadyExists = <T>(oldValues: T[], newValues: T[]): T[] => {
    try {
        for (const data of newValues) {
            if (!oldValues.find((dt) => dt === data)) {
                oldValues.push(data);
            }
        }
        return [...oldValues];
    }
    catch (ex) {
        throw ex;
    }
}