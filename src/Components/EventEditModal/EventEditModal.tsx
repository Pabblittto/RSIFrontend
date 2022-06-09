import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppEvent, EventTypes } from "../../Models/AppEvents";
import { DateTime } from "luxon";
import moment from "moment";

export type EditModalType =
  | {
      isModalShown: true;
      event: AppEvent;
    }
  | {
      isModalShown: false;
    };

export const EventEditModal = ({
  onAccept,
  onClose,
  editingData,
}: {
  onAccept: (newEvent: AppEvent) => void;
  onClose: () => void;
  editingData: EditModalType;
}) => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      await form.validateFields();
    } catch (err) {
      console.log(err);
      message.error("Fix issues in the form");
      return;
    }

    const eventDate = new Date(form.getFieldValue("date").toString());

    const newEvent: AppEvent = {
      eventId: editingData.isModalShown ? editingData.event.eventId : 0,
      name: form.getFieldValue("name"),
      date: eventDate.toISOString(),
      month: eventDate.getMonth(),
      year: eventDate.getFullYear(),
      type: form.getFieldValue("type"),
      week: DateTime.fromISO(eventDate.toISOString()).weekNumber,
      description: form.getFieldValue("description") ?? "",
    };

    console.log(newEvent);
    onAccept(newEvent);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      centered
      title={"New Event"}
      visible={editingData.isModalShown}
      onOk={() => onSubmit()}
      okText="Update Event"
      onCancel={onCancel}
      destroyOnClose
      forceRender
    >
      {editingData.isModalShown === true && (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
        >
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              { required: true, message: "Name of the event is required!" },
            ]}
            initialValue={editingData.event.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type of event is required!" }]}
            initialValue={editingData.event.type}
          >
            <Select>
              {Object.keys(EventTypes).map((key) => (
                <Select.Option key={key} value={key}>
                  {key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name={"date"}
            rules={[
              { required: true, message: "Date of the event is required!" },
            ]}
            initialValue={moment(editingData.event.date)}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            initialValue={editingData.event.description}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
