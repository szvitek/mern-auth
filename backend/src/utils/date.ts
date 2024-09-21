import { addDays, addMinutes, addYears } from "date-fns";

export const oneYearFromNow = () => addYears(new Date(), 1);

export const thirtyDaysFromNow = () => addDays(new Date(), 30);

export const fifteenMinutesFromNow = () => addMinutes(new Date(), 15);
