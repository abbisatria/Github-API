import { useEffect, useState } from 'react';
import { Container, Input, Row, Col, Card, CardBody, CardTitle, Button, CardFooter, ButtonGroup } from 'reactstrap';
import { getLanguage, getListRepo } from './services/github';
import moment from 'moment';
import Loader from './components/loader';

interface DataTypes {
  id: number,
  name: string,
  language: string,
  html_url: string,
  created_at: string,
  pushed_at: string,
  languages_url: string,
}

function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const response = await getListRepo({ sort: 'pushed' })
    if (!response.error) {
      const result: any = await Promise.all(response.data.map(async (val: DataTypes) => {
        if (!val.language) {
          const language = await getLanguage(val.languages_url)
          val.language = Object.keys(language.data)[0]
        }
        return val
      }))
      setData(result)
    }
    setIsLoading(false);
  }

  const updated = (value: DataTypes) => {
    const differenceInTime = new Date().getTime() - new Date(value.pushed_at).getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays === 0) {
      if (new Date().getMinutes() - new Date(value.pushed_at).getMinutes() === 0) {
        return `Updated ${new Date().getSeconds() - new Date(value.pushed_at).getSeconds()} seconds ago`
      }
      if (new Date().getHours() - new Date(value.pushed_at).getHours() === 0) {
        return `Updated ${new Date().getMinutes() - new Date(value.pushed_at).getMinutes()} minutes ago`
      }
      return `Updated ${new Date().getHours() - new Date(value.pushed_at).getHours()} hours ago`
    } else if (differenceInDays < 31) {
      return `Updated ${new Date().getDate() - new Date(value.pushed_at).getDate()} days ago`
    } else {
      if (new Date().getFullYear() === new Date(value.pushed_at).getFullYear()) {
        return `Updated on ${moment(value.pushed_at).format('MMMM D')}`
      }
      return `Updated on ${moment(value.pushed_at).format('MMMM D, YYYY')}`
    }
  }

  const handleChangePage = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setPage(page);
      setIsLoading(false);
    }, 2000);
  };

  const indexOfLastPost = page * 6;
  const indexOfFirstPost = indexOfLastPost - 6;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.length / 6);

  return (
    <>
      {isLoading && <Loader />}
      <Container className="py-5">
        <Row className="mb-3">
          <Col md={4}>
            <Input placeholder="Search..." />
          </Col>
        </Row>
        <Row>
          {currentPosts.length > 0 && currentPosts.map((val: DataTypes) => {
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
                          {val.language || '-'}
                        </Col>
                        <Col md={9}>
                          {updated(val)}
                        </Col>
                      </Row>
                    </div>
                    <Button onClick={() => window.open(val.html_url)}>
                      Detail Repository
                    </Button>
                  </CardBody>
                  <CardFooter>
                    Created {moment(val.created_at).format('D MMMM YYYY')}
                  </CardFooter>
                </Card>
              </Col>
            )
          })}
        </Row>
        <div className="text-center">
          <ButtonGroup>
            <Button outline onClick={() => handleChangePage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button outline onClick={() => handleChangePage(page + 1)} disabled={totalPages === page}>
              Next
            </Button>
          </ButtonGroup>
        </div>
      </Container>
    </>
  );
}

export default App;
