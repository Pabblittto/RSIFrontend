/**
 * Model based on model type from backend
 */
export type AppEvent = {
  eventId: number;
  name: string;
  type: EventTypes;
  description: string;
  date: string;
  week: number;
  month: number;
  year: number;
};

// assign the same value to each value! it's important
export enum EventTypes {
  concert = "concert",
  meeting = "meeting",
  "sport event" = "sport event",
  "public duscussion" = "public duscussion",
}
