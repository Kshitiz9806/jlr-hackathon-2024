import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Spinner } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ExcelUploadPage = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [jiraTickets, setJiraTickets] = useState([]);
  const [reviewTickets, setReviewTickets] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [showCreateJiraButton, setShowCreateJiraButton] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
      setShowTable(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCreateJiraTickets = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const tickets = excelData.map((row) => {
        const ticketNumber = Math.floor(100000 + Math.random() * 900000);
        return {
          ...row,
          url: `http://jira.devops.jlr-apps.com/browse/AADT-${ticketNumber}`,
        };
      });
      setJiraTickets(tickets);
      setIsProcessing(false);
      setShowReviewButton(true); // Show the review tickets button after JIRA tickets are created
      setShowCreateJiraButton(false); // Hide the create JIRA tickets button after JIRA tickets are created
    }, 2000); // Simulate a delay of 2 seconds
  };

  const handleCreateReviewTickets = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const tickets = excelData.map((row) => {
        const ticketNumber = Math.floor(100000 + Math.random() * 900000);
        return {
          ...row,
          url: `http://jira.devops.jlr-apps.com/browse/AEX-${ticketNumber}`,
          title: `REVIEW of AEX-${ticketNumber} - ${row.title}`,
        };
      });
      setReviewTickets(tickets);
      setIsProcessing(false);
      setShowReviewButton(false); // Hide the review tickets button after review tickets are created
    }, 2000); // Simulate a delay of 2 seconds
  };

  const handleCellEdit = (rowIndex, columnKey, newValue) => {
    const updatedData = [...excelData];
    updatedData[rowIndex][columnKey] = newValue;
    setExcelData(updatedData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="az-dashboard-one-title">
            <div>
              <h2 className="az-dashboard-title">Welcome to the JIRA Automation Tool</h2>
              <p className="az-dashboard-text">Using our Jira Automation Suite, we can create JIRA tickets based on Excel Sheet input.</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          backgroundColor: '#f8f9fa',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.5s ease',
          cursor: 'pointer',
          height: '60px',
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <Col style={{ textAlign: 'center' }}>
          <Form>
            <Form.Group controlId="formFile" className="mb-3" style={{ position: 'relative' }}>
              <Form.Label
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#495057',
                  margin: 0,
                }}
              >
                Click here to Upload Excel File
              </Form.Label>
              <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{ display: 'none' }} id="fileInput" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <CSSTransition in={showTable} timeout={500} classNames="fade" unmountOnExit>
        <Row>
          <Col>
            {fileName && (
              <>
                <h4>File: {fileName}</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      {excelData.length > 0 && Object.keys(excelData[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.keys(row).map((columnKey) => {
                          const value = row[columnKey];
                          if (columnKey === 'title') {
                            return (
                              <td key={columnKey} contentEditable onBlur={(e) => handleCellEdit(rowIndex, columnKey, e.target.textContent)}>
                                <strong>{value}</strong>
                              </td>
                            );
                          } else if (columnKey === 'storyPoints') {
                            return (
                              <td key={columnKey}>
                                <Form.Control type="number" defaultValue={value} onBlur={(e) => handleCellEdit(rowIndex, columnKey, e.target.value)} />
                              </td>
                            );
                          } else if (columnKey === 'assignee' || columnKey === 'reviewer') {
                            return (
                              <td key={columnKey}>
                                <Form.Control type="text" defaultValue={value} onBlur={(e) => handleCellEdit(rowIndex, columnKey, e.target.value)} />
                              </td>
                            );
                          } else {
                            return (
                              <td key={columnKey} contentEditable onBlur={(e) => handleCellEdit(rowIndex, columnKey, e.target.textContent)}>
                                {value}
                              </td>
                            );
                          }
                        })}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
        </Row>
      </CSSTransition>
      <Row className="mt-4">
        <Col>
          {isProcessing ? (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Creating JIRA tickets...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {showCreateJiraButton && (
                <Button
                  variant="primary"
                  onClick={handleCreateJiraTickets}
                  style={{
                    width: '100%',
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Create JIRA Tickets
                </Button>
              )}
              {showReviewButton && (
                <Button
                  variant="success"
                  onClick={handleCreateReviewTickets}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#28a745',
                    borderColor: '#28a745',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Create Review Tickets
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
      <CSSTransition in={jiraTickets.length > 0} timeout={500} classNames="fade" unmountOnExit>
        <Row className="mt-4">
          <Col>
            <div className="az-dashboard-one-title">
              <div>
                <h2 className="az-dashboard-title">Created JIRA Tickets</h2>
                <p className="az-dashboard-text">Following is the list of sprint tickets and corresponding URLs</p>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <TransitionGroup component={null}>
                  {jiraTickets.map((ticket, index) => (
                    <CSSTransition key={index} timeout={500} classNames="fade">
                      <tr>
                        <td>{ticket.title}</td>
                        <td>
                          <a href={ticket.url} target="_blank" rel="noopener noreferrer">
                            {ticket.url}
                          </a>
                        </td>
                      </tr>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </tbody>
            </Table>
          </Col>
        </Row>
      </CSSTransition>
      <CSSTransition in={reviewTickets.length > 0} timeout={500} classNames="fade" unmountOnExit>
        <Row className="mt-4">
          <Col>
            <div className="az-dashboard-one-title">
              <div>
                <h2 className="az-dashboard-title">Created Review Tickets</h2>
                <p className="az-dashboard-text">Following is the list of review tickets and corresponding URLs</p>
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <TransitionGroup component={null}>
                  {reviewTickets.map((ticket, index) => (
                    <CSSTransition key={index} timeout={500} classNames="fade">
                      <tr>
                        <td>{ticket.title}</td>
                        <td>
                          <a href={ticket.url} target="_blank" rel="noopener noreferrer">
                            {ticket.url}
                          </a>
                        </td>
                      </tr>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </tbody>
            </Table>
          </Col>
        </Row>
      </CSSTransition>
    </Container>
  );
};

export default ExcelUploadPage;
