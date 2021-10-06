import { Card, Layout, Row, Col, Typography, Button } from 'antd';
import Flights from "../assets/flights.json"
const { Title } = Typography;
const itineraries = Flights.itineraries
const legs = Flights.legs
let flight_info = []

function convertMinsToHrsMins (minutes) {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return h + 'h : ' + m + 'm';
}

itineraries.forEach(function (itinerary) {
	const id = itinerary.id
	const price = itinerary.price
	const agent = itinerary.agent
	const leg_ids = itinerary.legs
	let leg_info = []
	leg_ids.forEach(function (leg_id){
		legs.forEach(function (leg){
			if (leg.id === leg_id) {
				let departure_time = ((leg.departure_time).toString());
				let arrival_time = ((leg.arrival_time).toString())
				leg_info.push( 
					{
						"id": leg.id,
						"departure_airport": leg.departure_airport,
						"arrival_airport": leg.arrival_airport,
						"departure_time": departure_time.substr(departure_time.length - 5),
						"arrival_time": arrival_time.substr(arrival_time.length - 5),
						"airline_id": leg.airline_id,
						"duration_mins": convertMinsToHrsMins(leg.duration_mins)
					}
				)
			}
		});
	});
	flight_info.push({
		"id": id,
		"price": price,
		"agent": agent,
		"legs": leg_info
	})
});

function FlightTickets () {
  const tickets = flight_info;
  return tickets.map(function(ticket){
    return (
      <Layout id={ticket.id} style={{ padding: '0px 0px 24px' }}>
        <Card>
            <Row>
                <Col span={1}>
                    <img 
                      style={{
                        height: '20px',
                        width: '20px'
                      }} 
                      src={`https://logos.skyscnr.com/images/airlines/favicon/${ticket.legs[0].airline_id}.png`}
                      alt="airline logo"  
                    />
                </Col>
                <Col span={20}>
                  <p>{ticket.legs[0].departure_time} → {ticket.legs[0].arrival_time}</p>
                </Col>
                <Col style={{ marginLeft: 'auto' }}>
                  <p>{ticket.legs[0].duration_mins}</p>
                </Col>
            </Row>

            <Row>
              <Col span={1}>
              </Col>
              <Col span={20}>
                  <p>{ticket.legs[0].departure_airport} → {ticket.legs[0].arrival_airport}</p>
              </Col>
            </Row>            

            <Row>
                <Col span={1}>
                    <img 
                        style={{
                          height: '20px',
                          width: '20px',
                        }} 
                        alt="airline logo"
                        src={`https://logos.skyscnr.com/images/airlines/favicon/${ticket.legs[1].airline_id}.png`
                    }/>
                </Col>
                <Col span={20}>
                  <p>{ticket.legs[1].departure_time} → {ticket.legs[1].arrival_time}</p>
                </Col>
                <Col style={{ marginLeft: 'auto' }}>
                  <p>{ticket.legs[1].duration_mins}</p>
                </Col>
            </Row>

            <Row>
              <Col span={1}>
              </Col>
              <Col span={20}>
                  <p>{ticket.legs[1].departure_airport} → {ticket.legs[1].arrival_airport}</p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                  <Title level={3}>{ticket.price}</Title>
              </Col>
            </Row>
            <Row>
                <Col span={3}>
                    <p>{ticket.agent}</p>
                </Col>
                <Col style={{ marginLeft: 'auto' }}>
                    <Button type="primary" size='large'>Select</Button>
                </Col>
            </Row>  
        </Card>
      </Layout>
    )
  })
}

export default FlightTickets;