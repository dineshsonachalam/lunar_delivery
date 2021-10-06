import { DatePicker, Form, Button, InputNumber, Timeline, Row, Col, Card, Layout} from 'antd';
import React from "react";
import moment from 'moment-timezone';
moment.tz.setDefault("utc");

function Calendar() {
  const [selectedTime, setSelectedTime] = React.useState("");
  const [earthToSpaceStation, setEarthToSpaceStation] = React.useState(1);
  const [spaceStationToMoon, setSpaceStationToMoon] = React.useState(3);
  const [utcShipmentTime, setUtcShipmentTime] = React.useState("");
  const [utcDeliveryTime, setUtcDeliveryTime] = React.useState("");
  const [lstShipmentTime, setLstShipmentTime] = React.useState("");
  const [lstDeliveryTime, setLstDeliveryTime] = React.useState("");

  function onDateChange(value, dateString) {
    console.log("Value:", value);
    setSelectedTime(dateString.replace(" ", "T")+"Z");
  }

  function onChangeEarthToSpaceStation(value) {
    setEarthToSpaceStation(value);
  }

  function onChangeSpaceStationToMoon(value) {
    setSpaceStationToMoon(value);
  }
  async function getData(url, requestOptions) {
    const response = await fetch(url,requestOptions);
    return response.json(); 
  }

  async function onFinish(values) {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/delivery`;
    console.log(url);
    let requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "shipment_time": selectedTime,
        "warehouse_to_earth_station": earthToSpaceStation,
        "earth_station_to_lunar_colony": spaceStationToMoon
      }),
      redirect: "follow"
    };
    let shipmentDetails = await getData(url, requestOptions);
    let utcTime = selectedTime.substring(0, selectedTime.length - 1);
    setUtcShipmentTime(utcTime.replace("T", " "));
    setUtcDeliveryTime(shipmentDetails.utc_delivery_time);
    setLstShipmentTime(shipmentDetails.lst_shipment_time);
    setLstDeliveryTime(shipmentDetails.lst_delivery_time);
  }

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  return (
    <div>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="date-picker" label="Shipping date (UTC)" {...config}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={onDateChange} />
        </Form.Item>
        <Form.Item label="Earth to International Space Station (Estimated time in days)">
          <InputNumber min={1} max={20} defaultValue={1} onChange={onChangeEarthToSpaceStation} />
        </Form.Item>
        <Form.Item label="International Space station to Moon (Estimated time in days)">
          <InputNumber min={1} max={20} defaultValue={3} onChange={onChangeSpaceStationToMoon} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {utcShipmentTime && utcDeliveryTime && lstShipmentTime && lstDeliveryTime &&
          <Layout style={{ padding: '0px 0px 24px' }}>
              <Card>
                <Row justify="center">
                  <Col span={8}>
                    <center><h2>Estimated delivery in UTC</h2></center>
                    <Timeline mode="left">
                      <Timeline.Item label={utcShipmentTime}>Shipping date</Timeline.Item>
                      <Timeline.Item label={utcDeliveryTime}>Delivery date</Timeline.Item>
                    </Timeline>
                  </Col>
                  <Col span={8}>
                    <center><h2>Estimated delivery in LST</h2></center>
                    <Timeline mode="left">
                      <Timeline.Item label={lstShipmentTime}>Shipping date</Timeline.Item>
                      <Timeline.Item label={lstDeliveryTime}>Delivery date</Timeline.Item>
                    </Timeline>
                  </Col>
                </Row>
              </Card>
          </Layout>
      }

    </div>
  )
}

export default Calendar;