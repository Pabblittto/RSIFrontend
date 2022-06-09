import { Col, Modal, Row, Tag } from "antd";
import { AppEvent } from "../../Models/AppEvents";

export const EventDetailsModal = ({
  isShown,
  event,
  onclose,
}: {
  isShown: boolean;
  event: AppEvent | undefined;
  onclose: () => void;
}) => {
  return (
    <Modal
      centered
      title={event ? event.name : "No event"}
      visible={isShown}
      onOk={onclose}
      okButtonProps={{ title: "Hide" }}
      onCancel={onclose}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      {event ? (
        <>
          <Row gutter={[16, 16]}>
            <Col span={5}>Name:</Col>
            <Col span={19}>{event.name}</Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={5}>Type:</Col>
            <Col span={19}>
              <Tag>{event.type}</Tag>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={5}>Date:</Col>
            <Col span={19}>{new Date(event.date).toDateString()}</Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={5}>Description:</Col>
            <Col span={19}>{event.description}</Col>
          </Row>
        </>
      ) : (
        <div></div>
      )}
    </Modal>
  );
};
