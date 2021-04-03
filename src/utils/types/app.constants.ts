//Server root URL for either dev or prodcuction
export enum NODE_ENVIRONMENT {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}

export const NODE_ENV = process.env.NODE_ENV || 'development';

export enum KlarityRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

/**
 *? A.K.A AccessPriviledge
 */
export enum SubscriptionPlan {
    FREE_ACCOUNT = "FREE_ACCOUNT",
    PREMIUM_ACCOUNT = "PREMIUM_ACCOUNT"
}

export enum RunStatus {
    LIVE = "LIVE",
    PAUSED = "PAUSED",
    PLANNED = "PLANNED",
    ABANDONED = "ABANDONED"
}

export enum NoteType {
    SYSTEM_LOG = "SYSTEM_LOG",
    BUG_REPORT = "BUG_REPORT",
    FEATURE_SUGGESTION = "FEATURE_SUGGESTION",
    NOTE = "NOTE",
    REALITY_CHECK = "REALITY_CHECK"
}

export enum LevelType {
    MILESTONE = "MILESTONE",
    TASK = "TASK",
    PATH = "PATH",
    SYSTEM = "SYSTEM"
}

export enum AuthProvider {
    TWITTER = "TWITTER",
    FACEBOOK = "FACEBOOK",
    GOOGLE = " GOOGLE",
    LOCAL = "LOCAL"
}

export enum PaymentMethod {
    CARD = "CARD",
    BANK = "BANK"
}

export enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    ABSOLUTE = "ABSOLUTE"
}

export enum CompletionStatus {
    COMPLETED = "COMPLETED",
    ONGOING = "ONGOING",
    BACKLOG = "BACKLOG",
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS"
}

export enum GoalInterval {
    ACHIEVE_ONE_TIME = "ACHIEVE_ONE_TIME",
    REACH_DAILY = "REACH_DAILY",
    REACH_WEEKLY = "REACH_WEEKLY",
    REACH_MONTHLY = "REACH_MONTHLY",
    REACH_YEARLY = "REACH_YEARLY"
}

export enum TaskRepeatInterval {
    // WEEEKLY_ON_SUNDAY = "WEEEKLY_ON_SUNDAY",
    // WEEEKLY_ON_MONDAY = "WEEEKLY_ON_MONDAY",
    // WEEEKLY_ON_TUESDAY = "WEEEKLY_ON_TUESDAY",
    // WEEEKLY_ON_WEDNESDAY = "WEEEKLY_ON_WEDNESDAY",
    // WEEEKLY_ON_THURSDAY = "WEEEKLY_ON_THURSDAY",
    // WEEEKLY_ON_FRIDAY = "WEEEKLY_ON_FRIDAY",
    // WEEEKLY_ON_SATURDAY = "WEEEKLY_ON_SATURDAY",
    // WEEEKLY_ON_SAME_DAY = "WEEEKLY_ON_SAME_DAY",
    // MONTHLY_FIRST_DAY = "MONTHLY_FIRST_DAY",
    // MONTHLY_LAST_DAY = "MONTHLY_LAST_DAY",
    // MONTHLY_SAME_TIME = "MONTHLY_SAME_TIME",
    // ANUALLY_FIRST_DAY = "ANUALLY_FIRST_DAY",
    // ANUALLY_LAST_DAY = "ANUALLY_LAST_DAY",
    // ANUALLY_SAME_TIME = "ANUALLY_SAME_TIME",
    ONE_TIME_TASK = "ONE_TIME_TASK",
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    LATER_TODAY = "LATER_TODAY",
    CUSTOM = "CUSTOM",
}

export enum FeedbackType {
    BUG_REPORT = "BUG_REPORT",
    FEATURE_SUGGESTION = "FEATURE_SUGGESTION"
}

export enum KlarityFeatureType {
    JOURNEY = "JOURNEY",
    MILESTONE = "MILESTONE",
    TASK = "TASK",
    PATH = "PATH",
    SYSTEM = "SYSTEM"
}

export enum ImportanceType {
    CRITICAL = "CRITICAL",
    NORMAL = "NORMAL",
    NONE = "NONE"
}

export enum ActivityLogType {
    PATH_CREATED = "PATH_CREATED",
    MILESTONE_MET = "MILESTONE_MET",
    MILESTONE_CREATED = "MILESTONE_CREATED"
}

export const APIMessage = {
    BAD_OPERATION: "This operation is not supported",
    RECORD_EXISTS: "Record already exists",
    NOT_FOUND: "Record not found",
    UNAUTHORIZED_REQUEST: "You are not authorized to view this route",
    INACTIVE_ACCOUNT: "Your account is inactive",
    EXPIRED_TOKEN_MESSAGE: "Unauthorized access. You are using an expired token",
    UNAUTHORIZED_ERROR_MESSAGE: 'Unauthorized Access',
    CREATED: "Created",
    DELETED: "Deleted",
    UPDATE: "Updated",
    ROLE_MISMATCH: "This feature does not work this role",
    SET_GROUP_LIMIT: "Specify how many user(s) can share this group plan"
}

export enum OperationType {
    FAILED = "FAILED",
    SUCCESSFUL = "SUCCESSFUL"
}

/**
 *? Defines all the Keys that could be gotten from a user bearer after it's decoded
 *? Reduces risk of handcoding the wrong key
 */
export enum DecodedTokenResult {
    UserId = "UserId",
    Role = "Role",
    Email = "Email",
    HashKey = "HashKey"
}

export enum EmailSubject {
    FORGOT_PASSWORD = "Reset Password",
    VERIFY_ACCOUNT = "Account Verification"
}

export enum TitleDesignation {
    MR = "Mr",
    MRS = "Mrs",
    DOCTOR = "Dr",
    MISS = "Miss",
}

export enum MilestoneCompletionStatus {
    DELAYED = "DELAYED",
    ON_TRACK = "ON_TRACK",
    BEHIND = "BEHIND",
    ON_TIME = "ON_TIME"
}

export enum ReminderInterval {
    ONE_TIME = "ONE_TIME",
    WEEKLY = "WEEKLY"
}

export enum GoalTargetType {
    GAIN = "GAIN",
    LOSE = "LOSE",
    REACH = "REACH"
}

export enum MeasurementType {
    KILOGRAM = "KILOGRAM",
    MINUTE = "MINUTE",
    CUP = "CUP",
    KILOMETER = "KILOMETER",
    PAGE = "PAGE",
    MILILITER = "MILITER",
    CUSTOM = "CUSTOM",
    RUPPES = "RUPEES",
}

export enum GoalCompletionStatus {
    OPEN = "OPEN",
    COMPLETED = "COMPLETED"
}

export enum SetUpType {
    TAG = "TAG",
    DIMENSION = "DIMENSION",
    CORE_VALUE = "CORE_VALUE",
    PURPOSE_STATEMENT = "PURPOSE_STATEMENT"
}

export enum SubscriptionStatus {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    EXPIRED = "EXPIRED",
    IN_DISPUTE = "IN_DISPUTE"
}

export enum KlaritySubscriptionPlan {
    FREE_PLAN = "FREE PLAN"
}