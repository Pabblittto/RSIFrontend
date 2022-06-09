import { Button, message, Popconfirm, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { useEffect } from "react";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../API/events-api";
import { EventAddModal } from "../../Components/EventAddModal/EventAddModal";
import { EventDetailsModal } from "../../Components/EventDetailsModal/EventDetailsModal";
import {
  EditModalType,
  EventEditModal,
} from "../../Components/EventEditModal/EventEditModal";
import { SaveResultsAsPdfButton } from "../../Components/SaveResultsAsPdfButton/SaveResultsAsPdfButton";
import { useLoadingMessage } from "../../Hooks/messageHook";
import { AppEvent } from "../../Models/AppEvents";
import "./EventsScreen-styles.css";

export const EventsScreen = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [isNewEventModalShown, setIsNewEventModalShown] = useState(false);
  const [editModalData, setEditModal] = useState<EditModalType>({
    isModalShown: false,
  });
  const [detailsModal, setDetailModal] = useState<{
    showModal: boolean;
    event: AppEvent | undefined;
  }>({ showModal: false, event: undefined });

  const detailsPress = (id: number) => {
    const eventToShow = events.find((e) => e.eventId === id);
    if (eventToShow) {
      setDetailModal({ showModal: true, event: eventToShow });
    }
  };

  const hideDetailsModal = () => {
    setDetailModal((st) => ({ showModal: false, event: undefined }));
  };

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

  const onDeleteEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents((state) => state.filter((e) => e.eventId !== id));
    } catch (err) {
      console.log(err);
      message.error("Something gone wrong, check your credentials");
    }
  };

  const addNewEvent = async (event: AppEvent) => {
    try {
      await addEvent(event);
      // Fetch new data
      const res = await getEvents();
      setEvents(res.data);
      setIsNewEventModalShown(false);
    } catch (err) {
      console.log(err);
      message.error("Something gone wrong, check your credentials");
    }
  };

  const editEvent = async (event: AppEvent) => {
    try {
      await updateEvent(event);
      // Fetch new data
      const res = await getEvents();
      setEvents(res.data);
      setEditModal({ isModalShown: false });
    } catch (err) {
      console.log(err);
      message.error("Something gone wrong, check your credentials");
    }
  };

  const onEditPress = async (id: number) => {
    const editedEvent = events.find((e) => e.eventId === id);
    if (editedEvent) {
      setEditModal({
        isModalShown: true,
        event: editedEvent,
      });
    }
  };

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
      title: "Week Number",
      dataIndex: "week",
      key: "week",
      render: (weekNbr) => weekNbr,
    },
    {
      title: "Actions",
      dataIndex: "eventId",
      key: "actions",
      render: (id) => (
        <div>
          <Popconfirm
            title="Are you sure you want to delete this?"
            onConfirm={() => onDeleteEvent(id)}
          >
            <Button danger type="default">
              Delete
            </Button>
          </Popconfirm>
          <Button
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={() => onEditPress(id)}
          >
            Edit
          </Button>
          <Button type="primary" onClick={() => detailsPress(id)}>
            Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="edit-buttons-panel">
        <Button onClick={refreshData} className={"panel-button"}>
          Refresh screen
        </Button>
        <Button
          onClick={() => setIsNewEventModalShown(true)}
          type="primary"
          className="panel-button"
        >
          Add
        </Button>
        <SaveResultsAsPdfButton idList={events.map((e) => e.eventId)} />
      </div>
      <Table
        dataSource={events}
        columns={columns}
        pagination={false}
        rowKey={(e) => e.eventId}
      />
      <EventDetailsModal
        isShown={detailsModal?.showModal}
        event={detailsModal?.event}
        onclose={hideDetailsModal}
      />
      <EventAddModal
        isShown={isNewEventModalShown}
        onAccept={addNewEvent}
        onClose={() => setIsNewEventModalShown(false)}
      />
      {editModalData.isModalShown && (
        <EventEditModal
          editingData={editModalData}
          onAccept={editEvent}
          onClose={() => {
            setEditModal({ isModalShown: false });
          }}
        />
      )}
    </div>
  );
};
