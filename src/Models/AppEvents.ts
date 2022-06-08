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

export enum EventTypes {
  music = "music",
  meeting = "meeting",
}
