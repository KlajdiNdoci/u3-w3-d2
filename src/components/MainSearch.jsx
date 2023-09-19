import { useState } from "react";
import { Container, Row, Col, Form, Button, Placeholder, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { searchJobsAction } from "../actions";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  // const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  const jobsLoading = useSelector(state => state.jobsList.isLoading);
  const jobHasError = useSelector(state => state.jobsList.hasError);
  const jobErrorMessage = useSelector(state => state.jobsList.errorMessage);

  const jobs = useSelector(state => state.jobsList.content);

  const navigate = useNavigate();

  const [apiCallStarted, setApiCallStarted] = useState(false);

  // const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = e => {
    setQuery(e.target.value);
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(baseEndpoint + query + "&limit=20");
  //     if (response.ok) {
  //       const { data } = await response.json();
  //       setJobs(data);
  //     } else {
  //       alert("Error fetching results");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async e => {
    e.preventDefault();
    setApiCallStarted(true);
    dispatch(searchJobsAction(query));
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="d-flex flex-wrap align-items-center mx-auto my-3">
          <h1 className="display-1 me-auto">Remote Jobs Search</h1>
          <Button variant="outline-primary" onClick={() => navigate("/favourites")}>
            go to Favourites
          </Button>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="type and press Enter" />
          </Form>
        </Col>

        <Col xs={10} className="mx-auto mb-5">
          {jobHasError ? (
            <Col className="mt-3">
              <Alert variant="danger">{jobErrorMessage}</Alert>
            </Col>
          ) : (
            <>
              {apiCallStarted && jobsLoading ? (
                [...Array(5).keys()].map(num => (
                  <Row
                    className="mx-0 mt-3 p-3"
                    key={`placeholder-${num}`}
                    style={{ border: "1px solid #00000033", borderRadius: 4 }}
                  >
                    <Placeholder animation="glow">
                      <Placeholder xs={1} /> <Placeholder xs={6} /> <Placeholder xs={4} />
                    </Placeholder>
                  </Row>
                ))
              ) : (
                <>{jobs && jobs.map(jobData => <Job key={jobData._id} data={jobData} />)}</>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
