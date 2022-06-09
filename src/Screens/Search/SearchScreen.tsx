import { Button, DatePicker, Form, message, Select, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Moment } from "moment";
import { useState } from "react";
import { getEventsByDate, getEventsByWeeks } from "../../API/events-api";
import { SaveResultsAsPdfButton } from "../../Components/SaveResultsAsPdfButton/SaveResultsAsPdfButton";
import { AppEvent } from "../../Models/AppEvents";
import "./SearchScreen-styles.css";

export const SearchScreen = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [searchType, setSearchType] = useState<"week" | "date">("week");
  const [dateForm] = Form.useForm();

  const onSearchClick = async () => {
    if (dateForm.getFieldValue("date") === undefined) {
      message.info("Select a specific time in a picker");
      return;
    }

    try {
      const momentObject = dateForm.getFieldValue("date") as Moment;

      if (searchType === "date") {
        const date = momentObject.format("YYYY-MM-DD");
        const eventsByDate = await getEventsByDate(date);
        setEvents(eventsByDate.data);
      } else {
        const weekNumber = momentObject.week();
        const eventsByWeeks = await getEventsByWeeks(weekNumber);
        setEvents(eventsByWeeks.data);
      }
    } catch (err) {
      console.log(err);
      message.error("Something gone wrong, check your credentials");
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
  ];
  return (
    <div>
      <div className="searching-container">
        <Form form={dateForm} layout="inline">
          <Form.Item label="Search by">
            <Select
              defaultValue={"week"}
              onChange={(value, option) => {
                setSearchType(value as "week" | "date");
              }}
            >
              <Select.Option value="week">Search by week </Select.Option>
              <Select.Option value="date">Search by day </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker picker={searchType} />
          </Form.Item>
        </Form>
        <Button onClick={onSearchClick}>Search</Button>
        <SaveResultsAsPdfButton idList={events.map((e) => e.eventId)} />
      </div>
      <div className="result-text">Results:</div>
      <Table
        dataSource={events}
        columns={columns}
        pagination={false}
        rowKey={(e) => e.eventId}
      />
    </div>
  );
};
