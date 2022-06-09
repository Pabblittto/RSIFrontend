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

export const getEventsByWeeks = (week: number) =>
  mainService.get<AppEvent[]>(`/api/events/GetByWeek/${week}`);

export const getEventsByDate = (date: string) =>
  mainService.get<AppEvent[]>(`/api/events/GetByDate/${date}`);

export const downloadEventListAsPDF = (eventList: string[]) =>
  mainService.post(
    "/api/events/getpdf",
    {
      events: eventList,
    },
    {
      headers: {
        Accept: "application/octet-stream",
      },
      responseType: "blob",
    }
  );
