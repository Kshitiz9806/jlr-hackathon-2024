import React, { useState } from 'react';
import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const SkillsTable = ({ data, textKey, pillsKey }) => {
  const [tableData, setTableData] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [currentRowIndex, setCurrentRowIndex] = useState(null);

  const handleRemovePill = (rowIndex, pillIndex) => {
    const newData = [...tableData];
    newData[rowIndex][pillsKey].splice(pillIndex, 1);
    setTableData(newData);
  };

  const handleAddPill = () => {
    const newData = [...tableData];
    if (newSkill.trim()) {
      newData[currentRowIndex][pillsKey].push(newSkill.trim());
      setTableData(newData);
    }
    setNewSkill('');
    setShowModal(false);
  };

  const handleShowModal = (rowIndex) => {
    setCurrentRowIndex(rowIndex);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewSkill('');
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '70%' }}>Description</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {row[textKey]}
              </td>
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {row[pillsKey].map((pill, pillIndex) => (
                    <Badge
                      key={pillIndex}
                      pill
                      bg="primary"
                      text="white"
                      style={{ position: 'relative', padding: '10px 15px', fontSize: '1rem' }}
                    >
                      {pill}
                      <FaMinus
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '1px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'red',
                          marginLeft: '10px',
                        }}
                        onClick={() => handleRemovePill(rowIndex, pillIndex)}
                      />
                    </Badge>
                  ))}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShowModal(rowIndex)}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewSkill">
              <Form.Label>New Skill</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPill}>
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SkillsTable;
