import { addDays, format } from "date-fns";

export const nextTime = format(addDays(new Date(), 2), "yyyy-MM-dd");
