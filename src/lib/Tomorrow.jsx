import { addDays, format } from "date-fns";

export const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
