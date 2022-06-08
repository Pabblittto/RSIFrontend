/**
 * Model based on model type from backend
 */
export type AppEvent = {
  EventID: number;
  Name: string;
  Type: string;
  Description: string;
  Date: Date;
  Week: number;
  Month: number;
  Year: number;
};
