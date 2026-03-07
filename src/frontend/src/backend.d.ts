import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface WaitlistEntry {
    preferredStartDate: string;
    homeType: HomeType;
    city: string;
    name: string;
    elderly: bigint;
    email: string;
    children: bigint;
    squareFootage: bigint;
    timestamp: Time;
    adults: bigint;
    phone: string;
}
export enum HomeType {
    PG = "PG",
    OneBHK = "OneBHK",
    TwoBHK = "TwoBHK",
    FourBHKPlus = "FourBHKPlus",
    ThreeBHK = "ThreeBHK"
}
export interface backendInterface {
    addCalculatorQuery(homeType: HomeType, squareFootage: bigint, adults: bigint, children: bigint, elderly: bigint, calculatedPrice: bigint, recommendedHours: bigint): Promise<void>;
    addWaitlistEntry(name: string, phone: string, email: string, city: string, homeType: HomeType, squareFootage: bigint, adults: bigint, children: bigint, elderly: bigint, preferredStartDate: string): Promise<void>;
    getAllWaitlistEntries(): Promise<Array<WaitlistEntry>>;
    getWaitlistCount(): Promise<bigint>;
}
