import React, { useState } from 'react';
import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const SkillsTableFinal = ({ data, textKey, pillsKey }) => {
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
            <th>Description</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {row[textKey]}
              </td>
              <td>ppable1</td>
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

export default SkillsTableFinal;
