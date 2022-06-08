import { Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { getEvents } from "../../API/events-api";
import { useLoadingMessage } from "../../Hooks/messageHook";
import { AppEvent } from "../../Models/AppEvents";
import "./EventsScreen-styles.css";

export const EventsScreen = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const { endWithFailure, endWithSuccess, startLoading } = useLoadingMessage();

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    startLoading();
    try {
      const res = await getEvents();
      console.log(res.data);
      setEvents(res.data);
      endWithSuccess();
    } catch (err) {
      console.log(err);
      endWithFailure();
    }
  };

  const addNewEvent = () => {};

  return (
    <div>
      <div className="edit-buttons-panel">
        <Button onClick={refreshData} className={"panel-button"}>
          Refresh data
        </Button>
        <Button onClick={addNewEvent} type="primary" className="panel-button">
          Add
        </Button>
      </div>
    </div>
  );
};
