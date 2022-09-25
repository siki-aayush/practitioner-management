import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import React, { Dispatch, SetStateAction } from "react";
import CountryPhoneInput from "antd-country-phone-input";
import { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Upload,
} from "antd";

import { Practitioner } from "../../interfaces";
import { WEEK_DAYS } from "../../constants/common";
import "./PractitionerForm.css";

interface PractitionerFormInterface {
  initialValues?: Practitioner;
  id?: string;
  update: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const PractitionerForm = (props: PractitionerFormInterface) => {
  const navigate = useNavigate();
  const { Option } = Select;

  const URL = props.update
    ? `/practitioner/${props.initialValues?.id}`
    : "/practitioner/add";
  const METHOD = props.update ? "PUT" : "POST";

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone.phone);
    formData.append("address", values.address);
    formData.append("dob", values.dob.format("YYYY-MM-DD"));
    formData.append("photograph", values.photograph[0].originFileObj);
    formData.append("working_days", values.workingDays.join(","));
    formData.append("start_time", values.workingTime[0].format("HH:mm"));
    formData.append("end_time", values.workingTime[1].format("HH:mm"));

    if (props.update) {
      formData.append("id", props.id as string);
    }

    props.setIsLoading(true);

    try {
      const res = await axios(URL, {
        method: METHOD,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.data) {
        console.log("Practitioner created successfully");
        navigate("/practitioner");
      }
    } catch (error) {
      console.log(error);
    }
  };

  props.setIsLoading(false);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <ConfigProvider locale={en}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={
          props.update ? props.initialValues : { phone: { short: "NP" } }
        }
        className="practitioner-form"
        size="large"
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="address" label="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <CountryPhoneInput value={{ short: "NP" }} size="small" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="workingDays"
          label="Working Days"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "200" }}
            placeholder="Please select"
            onChange={(value) => {
              console.log("changed", value);
            }}
          >
            {WEEK_DAYS.map((day) => (
              <Option key={day}>{day.slice(0, 3)}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="workingTime"
          label="Working Time"
          rules={[{ required: true }]}
        >
          <TimePicker.RangePicker />
        </Form.Item>

        <Form.Item
          name="photograph"
          label="Profile Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <Upload name="photo" action="" listType="picture">
            <Button icon={<UploadOutlined />}>Document Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            {props.update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default PractitionerForm;
