import { Form, Input } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../../Services/authService";
import "./Sidebar-styles.css";

export const Sidebar = () => {
  const onChange = (v: unknown) => {
    AuthService.getInst().setUsername(form.getFieldValue("username") ?? "");
    AuthService.getInst().setPassword(form.getFieldValue("password") ?? "");
  };

  const [form] = useForm();

  useEffect(() => {
    onChange("");
  });

  return (
    <div className="container">
      <label>Authentication</label>
      <Form
        form={form}
        name="basic authentication"
        onChange={onChange}
        style={{ color: "white" }}
      >
        <Form.Item name="username">
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password placeholder="passowrd" />
        </Form.Item>
      </Form>
      <div className="spacer" />
    </div>
  );
};
