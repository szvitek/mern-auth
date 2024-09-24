import { addDays, addHours, addMinutes, addYears, subMinutes } from "date-fns";

export const oneYearFromNow = () => addYears(new Date(), 1);

export const thirtyDaysFromNow = () => addDays(new Date(), 30);

export const fifteenMinutesFromNow = () => addMinutes(new Date(), 15);

export const fiveMinutesAgo = () => subMinutes(Date.now(), 5);

export const oneHourFromNow = () => addHours(Date.now(), 1);

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
