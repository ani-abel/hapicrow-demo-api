import { ApiProperty } from "@nestjs/swagger";
import {
    NoteType,
    ActivityLogType,
    ImportanceType,
    KlarityFeatureType,
    OperationType,
    GoalCompletionStatus,
    GoalTargetType,
    MeasurementType,
    PaymentMethod,
    SubscriptionStatus
} from './app.constants';

/**
 * ? Define this class and set it as a mongodb type
 */
export class ActivityLog {
    @ApiProperty({
        enum: ActivityLogType
    })
    Type: ActivityLogType;

    @ApiProperty()
    Message: string;

    @ApiProperty()
    DateCreated: Date = new Date();
}


export class Note {
    @ApiProperty({
        enum: NoteType
    })
    Type: NoteType;

    @ApiProperty()
    Message: string;
}

export class MilestoneTask {
    @ApiProperty()
    TaskId: string;

    @ApiProperty({
        enum: ImportanceType
    })
    Importance: ImportanceType;
}

export class RealityCheckPurpose {
    @ApiProperty({
        enum: KlarityFeatureType
    })
    Type: KlarityFeatureType;

    /**
     * ? This could refer to either JourneyId, TaskId, or MilestoneId, depending on the "Type"
     */
    @ApiProperty()
    Id: string;
}

export class SubTask {
    // TODO organize later
}

export class CustomAPIType {
    @ApiProperty()
    Message: string;

    @ApiProperty({
        enum: OperationType,
    })
    OperationStatus: OperationType;

    @ApiProperty({
        nullable: true
    })
    CustomIdentifier?: string;
}

export class GoalType {
    @ApiProperty({
        enum: GoalTargetType
    })
    TargetType: GoalTargetType;

    @ApiProperty()
    TargetValue: number;

    @ApiProperty({
        enum: MeasurementType
    })
    MeasurementUnit: MeasurementType;

    @ApiProperty()
    DateCreated: Date;

    @ApiProperty()
    DueDate: Date;

    @ApiProperty({
        enum: GoalCompletionStatus
    })
    GoalCompletionstatus: GoalCompletionStatus
}

export class TaskPriorityType {
    @ApiProperty({
        nullable: true
    })
    IsImportant?: boolean;

    @ApiProperty({
        nullable: true
    })
    IsUrgent?: boolean
}

export class GuideTemplateMilestone {
    @ApiProperty()
    Title: string;

    @ApiProperty()
    Dimension: string;
}

export class InvoiceType {
    @ApiProperty()
    PaymentRef: string;

    @ApiProperty()
    DateOfPayment: Date;

    @ApiProperty({
        enum: PaymentMethod
    })
    ModeOfPayment: PaymentMethod;
}

export class UserSubscriptionType {
    @ApiProperty({
        required: true
    })
    Id: string;

    @ApiProperty()
    StartDate: Date;

    @ApiProperty({
        nullable: true,
        description: "If the plan is a free plan, 'EndDate' is marked as false"
    })
    EndDate?: Date;

    @ApiProperty({
        enum: SubscriptionStatus
    })
    Status: SubscriptionStatus;
}

export class GeoJsonType {
    @ApiProperty()
    geometry: { type: "Point", coordinates: number[] };

    @ApiProperty()
    type: "Feature";

    @ApiProperty()
    properties: any;
}