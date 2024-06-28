import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowUp, FaArrowDown, FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';

const EditableForm = ({ data, updateMyData, deleteRow }) => {

    const renderPriorityIcon = (priority) => {
        switch (priority) {
            case 'Highest':
                return <FaArrowUp style={{ color: 'red' }} />;
            case 'High':
                return <FaArrowUp style={{ color: 'orange' }} />;
            case 'Medium':
                return <FaArrowCircleUp style={{ color: 'yellow' }} />;
            case 'Low':
                return <FaArrowDown style={{ color: 'blue' }} />;
            case 'Lowest':
                return <FaArrowCircleDown style={{ color: 'green' }} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <Form>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.summary}
                                onChange={(e) => updateMyData('summary', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.description}
                                onChange={(e) => updateMyData('description', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="priority">
                            <Form.Label>Priority {renderPriorityIcon(data.priority)}</Form.Label>
                            <Form.Control
                                as="select"
                                value={data.priority}
                                onChange={(e) => updateMyData('priority', e.target.value)}
                            >
                                {['Highest', 'High', 'Medium', 'Low', 'Lowest'].map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={data.status}
                                onChange={(e) => updateMyData('status', e.target.value)}
                            >
                                {['To-Do', 'In Progress', 'Done'].map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={data.type}
                                onChange={(e) => updateMyData('type', e.target.value)}
                            >
                                {['Story', 'Task', 'Epic'].map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="assignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.assignee}
                                onChange={(e) => updateMyData('assignee', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="reviewer">
                            <Form.Label>Reviewer</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.reviewer}
                                onChange={(e) => updateMyData('reviewer', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="sprint">
                            <Form.Label>Sprint</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.sprint}
                                onChange={(e) => updateMyData('sprint', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="epic">
                            <Form.Label>Epic</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.epic}
                                onChange={(e) => updateMyData('epic', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="storyPoints">
                            <Form.Label>Story Points</Form.Label>
                            <Form.Control
                                as="select"
                                value={data.storyPoints}
                                onChange={(e) => updateMyData('storyPoints', e.target.value)}
                            >
                                {[0, 1, 2, 3, 5, 8, 13, 21, 34].map((point) => (
                                    <option key={point} value={point}>
                                        {point}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <DatePicker
                                selected={data.startDate ? new Date(data.startDate) : null}
                                onChange={(date) => updateMyData('startDate', date)}
                                dateFormat="yyyy/MM/dd"
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <DatePicker
                                selected={data.endDate ? new Date(data.endDate) : null}
                                onChange={(date) => updateMyData('endDate', date)}
                                dateFormat="yyyy/MM/dd"
                                className="form-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="component">
                            <Form.Label>Component</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.component}
                                onChange={(e) => updateMyData('component', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="asA">
                            <Form.Label>As a</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.asA}
                                onChange={(e) => updateMyData('asA', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="iWant">
                            <Form.Label>I want</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.iWant}
                                onChange={(e) => updateMyData('iWant', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="soThat">
                            <Form.Label>So that</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.soThat}
                                onChange={(e) => updateMyData('soThat', e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="danger" onClick={deleteRow}>
                    Delete
                </Button>
            </Form>
        </div>
    );
};

export default EditableForm;
