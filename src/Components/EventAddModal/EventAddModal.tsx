import {
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tag,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppEvent, EventTypes } from "../../Models/AppEvents";
import { DateTime } from "luxon";

export const EventAddModal = ({
  isShown,
  onAccept,
  onClose,
}: {
  isShown: boolean;
  onAccept: (newEvent: AppEvent) => void;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      await form.validateFields();
    } catch (err) {
      message.error("Fix issues in the form");
      return;
    }

    const eventDate = new Date(form.getFieldValue("date").toString());

    const newEvent: AppEvent = {
      eventId: 0,
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
      visible={isShown}
      onOk={() => onSubmit()}
      okText="Add Event"
      onCancel={onCancel}
    >
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Type of event is required!" }]}
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
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Description" name={"description"}>
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
