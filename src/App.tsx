import { Container, Input, Row, Col, Card, CardBody, CardTitle, CardText, Button, CardFooter, ButtonGroup } from 'reactstrap';

function App() {
  return (
    <Container className="py-5">
      <Row className="mb-3">
        <Col md={4}>
          <Input placeholder="Search..." />
        </Col>
      </Row>
      <Row>
        {[...Array(4)].map((val, idx) => {
          return (
            <Col md={6} className="mb-3" key={String(idx)}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5" className="mb-3">
                    Github-API
                  </CardTitle>
                  <CardText>
                    <Row>
                      <Col md={3}>
                        Typescript
                      </Col>
                      <Col md={9}>
                        Updated 20 minutes ago
                      </Col>
                    </Row>
                  </CardText>
                  <Button>
                    Detail Repository
                  </Button>
                </CardBody>
                <CardFooter>
                  Created 2021-10-16T20:09:14Z
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
