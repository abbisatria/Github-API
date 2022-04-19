import { useEffect, useState } from 'react';
import { Container, Input, Row, Col, Card, CardBody, CardTitle, Button, CardFooter, ButtonGroup } from 'reactstrap';
import { getListRepo } from './services/github';

interface DataTypes {
  id: number,
  name: string,
  language: string,
  html_url: string,
  created_at: string,
  updated_at: string,
}

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const response = await getListRepo({ sort: 'pushed' })
    if (!response.error) {
      setData(response.data)
    }
  }

  return (
    <Container className="py-5">
      <Row className="mb-3">
        <Col md={4}>
          <Input placeholder="Search..." />
        </Col>
      </Row>
      <Row>
        {data.length > 0 && data.map((val: DataTypes) => {
          return (
            <Col md={6} className="mb-3" key={String(val.id)}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5" className="mb-3">
                    {val.name}
                  </CardTitle>
                  <div className="card-text mb-3">
                    <Row>
                      <Col md={3}>
                        {val.language}
                      </Col>
                      <Col md={9}>
                        {val.updated_at}
                      </Col>
                    </Row>
                  </div>
                  <Button onClick={() => window.open(val.html_url)}>
                    Detail Repository
                  </Button>
                </CardBody>
                <CardFooter>
                  Created {val.created_at}
                </CardFooter>
              </Card>
            </Col>
          )
        })}
      </Row>
      <div className="text-center">
        <ButtonGroup>
          <Button outline>
            Previous
          </Button>
          <Button outline>
            Next
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default App;
