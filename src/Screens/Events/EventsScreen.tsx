import { Button, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
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
      setEvents([]);
      endWithFailure();
    }
  };

  const addNewEvent = () => {};

  const columns: ColumnsType<AppEvent> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "Type",
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toDateString(),
    },
    {
      title: "Actions",
      dataIndex: "eventId",
      key: "actions",
      render: (text) => (
        <Button danger type="default">
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="edit-buttons-panel">
        <Button onClick={refreshData} className={"panel-button"}>
          Refresh screen
        </Button>
        <Button onClick={addNewEvent} type="primary" className="panel-button">
          Add
        </Button>
      </div>
      <Table dataSource={events} columns={columns} pagination={false} />
    </div>
  );
};
