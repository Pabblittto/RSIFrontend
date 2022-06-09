import { AppEvent } from "../Models/AppEvents";
import { mainService } from "./mainService";

export const getEvents = () => mainService.get<AppEvent[]>("/api/events");

export const getEvent = (id: number) =>
  mainService.get<AppEvent>(`/api/events/${id}`);

export const addEvent = (event: AppEvent) =>
  mainService.post("/api/events", event);

export const deleteEvent = (id: number) =>
  mainService.delete(`/api/events/${id}`);

export const updateEvent = (event: AppEvent) =>
  mainService.put(`/api/events/${event.eventId}`, event);
