export enum StaffTypeEnum {
    Admin = 1,
    SiteManager = 2,
    Sale = 3
}

export enum CarImageTypeEnum {
    Normal = 0,
    Primary = 1
}

export enum CarStatusEnum {
    Available = 1,
    Renting = 2,
    InMaintenance = 3,
    Unavailable = 4
}

export enum BookingTypeEnum {
    ByHour = 1,
    ByDay = 2,
    ByMonth = 3,
}

export enum BookingStatusEnum {
    Holding = 1,
    Booked = 2,
    Rented = 3,
    Returned = 4,
    Cancelled = 5
}

export enum PaymentTypeEnum {
    InternationalTransfer = 1,
    DomesticTransfer = 2
}

export enum PaymentStatusEnum {
    New = 1,
    Processing = 2,
    Success = 3
}

export const Distance = 10;