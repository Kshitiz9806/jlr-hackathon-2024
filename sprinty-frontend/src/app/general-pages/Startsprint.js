import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Add, Remove } from '@mui/icons-material';
import EditableForm from '../tables/EditableTable';
import Header from '../shared/Header';
import SkillsTable from './SkillsTable';
import Badge from "react-bootstrap/Badge"; 
import SkillsTableFinal from './SkillsTableFinal';
import DatePicker from 'react-datepicker';

const StartSprint = () => {
    const [selectedDateSprintStart, setSelectedDateSprintStart] = useState(null);

    const handleDateChangeSprintStart = (date) => {
        setSelectedDateSprintStart(date);
    };
    const [ticketInfo, setTicketInfo] = useState([
        {
            "title": "TRM: Update Wired Update Requirements for ORIN",
            "description": "Update wired update requirements for ORIN in the TRM document.",
            "acceptance_criteria": "Updated TRM document reflects the latest wired update requirements for ORIN.",
            "i_want": "Updated TRM document",
            "so_that": "The development team has clear guidelines for ORIN wired updates.",
            "skills": ["trm"]
        },
        {
            "title": "TRM: Add Discussion with Integration Team for Authentication/Validation",
            "description": "Schedule a discussion with the integration team to define support for authentication and validation in the TRM.",
            "acceptance_criteria": "A meeting is held with the integration team to discuss authentication/validation support. The TRM is updated to reflect the agreed-upon approach.",
            "i_want": "Meeting with integration team and updated TRM",
            "so_that": "A clear understanding is established for implementing authentication and validation.",
            "skills": ["trm", "communication"]
        },
        {
            "title": "TRM: Review Cybersecurity Requirements",
            "description": "Review and update cybersecurity requirements in the TRM document.",
            "acceptance_criteria": "The TRM document is reviewed and updated to address all relevant cybersecurity requirements.",
            "i_want": "Updated TRM with cybersecurity requirements",
            "so_that": "The system adheres to the latest cybersecurity standards.",
            "skills": ["trm"]
        },
        {
            "title": "MSOSA: Document Software and Calibration Update Sequence",
            "description": "Create a high-level sequence diagram for software and calibration updates in the MSOSA artifacts.",
            "acceptance_criteria": "The MSOSA artifacts include a high-level sequence diagram illustrating the software and calibration update process.",
            "i_want": "Sequence diagram in MSOSA artifacts",
            "so_that": "The update process is clearly documented and understood.",
            "skills": ["msosa"]
        },
        {
            "title": "MSOSA: Update Interface Definitions (IBD) for Diagnostic, SUM, ISL, DAL, Network API",
            "description": "Update the Interface Definition documents (IBD) in the MSOSA artifacts for Diagnostic Interface, SUM, ISL, DAL, and Network API.",
            "acceptance_criteria": "The IBD documents for Diagnostic Interface, SUM, ISL, DAL, and Network API are updated to reflect the latest interface specifications.",
            "i_want": "Updated IBD documents in MSOSA",
            "so_that": "The interfaces between system components are clearly defined.",
            "skills": ["msosa"]
        },
        {
            "title": "MSOSA: Create Class Diagrams for DAL, SW Diag Controller, SWDL Adaptive AUTOSAR, Network API",
            "description": "Create class diagrams for DAL, SW Diag Controller, SWDL Adaptive AUTOSAR component, and Network API in the MSOSA artifacts.",
            "acceptance_criteria": "The MSOSA artifacts include class diagrams for DAL, SW Diag Controller, SWDL Adaptive AUTOSAR component, and Network API.",
            "i_want": "Class diagrams in MSOSA for specified components",
            "so_that": "The design of these components is well-documented.",
            "skills": ["msosa"]
        },
        {
            "title": "ORIN Wired Update: Fix Preevision Model Compilation Issues",
            "description": "Integrate fixes to address compilation issues encountered with the Preevision model for ORIN wired update.",
            "acceptance_criteria": "The Preevision model compiles successfully for ORIN wired update.",
            "i_want": "Preevision model compiling without errors",
            "so_that": "The Preevision model can be used for ORIN wired update validation.",
            "skills": ["autosar adaptive", "debugging", "c++"]
        },
        {
            "title": "ORIN Wired Update: Validate SWDL Application (AEX-125901, AEX-125913)",
            "description": "Validate the SWDL application for ORIN wired update according to JIRA tickets AEX-125901 (Basic IPC) and AEX-125913 (S2S binding).",
            "acceptance_criteria": "The SWDL application functions as expected for basic IPC and S2S binding communication in the ORIN wired update process.",
            "i_want": "Validated SWDL application for AEX-125901 and AEX-125913",
            "so_that": "The SWDL application can be validated",
            "skills": ["c++", "debugging"]
        },
        {
            "title": "SOTA Update: Integrate Latest SUM Release (Tag: 3.0.0)",
            "description": "Integrate the latest SUM release (Tag: 3.0.0) into the SOTA update process.",
            "acceptance_criteria": "The SOTA update process successfully integrates and utilizes the latest SUM release (Tag: 3.0.0).",
            "i_want": "SOTA update using SUM release 3.0.0",
            "so_that": "The system benefits from the improvements and bug fixes in SUM 3.0.0.",
            "skills": ["c++, debugging"]
        },
        {
            "title": "SOTA Update: Validate BSDIFF Integration",
            "description": "Perform validation to ensure BSDIFF integration functions correctly within the SOTA update process.",
            "acceptance_criteria": "BSDIFF integration is validated and operational for SOTA updates.",
            "i_want": "Validated BSDIFF integration in SOTA update",
            "so_that": "SOTA updates leverage BSDIFF for efficient delta updates.",
            "skills": ["python", "debugging"]
        },
        {
            "title": "SOTA Update: Cascade BSDIFF Requirements to NVIDIA",
            "description": "Cascade the specific requirements for BSDIFF integration to NVIDIA for their consideration and implementation.",
            "acceptance_criteria": "NVIDIA acknowledges and understands the BSDIFF requirements for SOTA updates.",
            "i_want": "NVIDIA aware of BSDIFF requirements",
            "so_that": "A collaborative effort can ensure successful BSDIFF integration with NVIDIA components.",
            "skills": ["trm"]
        },
        {
            "title": "Aurix Bootmanager: Test SWDL SWC with Injected UDP Messages",
            "description": "Develop a test plan to inject UDP messages and test the SWDL SWC functionality in the Aurix Bootmanager.",
            "acceptance_criteria": "A test plan is created and executed to validate the SWDL SWC's behavior when receiving UDP messages.",
            "i_want": "Test plan and execution for SWDL SWC with UDP messages",
            "so_that": "We can identify and address any issues with the SWDL SWC's UDP message handling.",
            "skills": ["testing"]
        },
        {
            "title": "Aurix Bootmanager: Investigate SIMS Ticket for TAMS Issue (if UDP Messages not Received)",
            "description": "If UDP messages are not reaching the SWDL SWC, investigate the issue and log a SIMS ticket with the IPCRouting team.",
            "acceptance_criteria": "The cause of UDP messages not reaching the SWDL SWC is investigated. If necessary, a SIMS ticket is logged with the IPCRouting team to address the issue.",
            "i_want": "Investigation and potential SIMS ticket for missing UDP messages",
            "so_that": "The communication issue between components is resolved, enabling proper SWDL SWC testing.",
            "skills": ["debugging"]
        },
        {
            "title": "Aurix Bootmanager: Update RTE Build Configuration for SWDL SWC Testing",
            "description": "Identify and implement the necessary configurations in the latest RTE build to facilitate testing of the SWDL SWC.",
            "acceptance_criteria": "The latest RTE build is configured to allow effective testing of the SWDL SWC functionality.",
            "i_want": "Latest RTE build configured for SWDL SWC testing",
            "so_that": "We can proceed with testing the Aurix Bootmanager's SWDL SWC without limitations from the RTE build.",
            "skills": ["testing"]
        }
    ]);

    const addSkill = (ticketIndex) => {
        const newSkill = prompt("Enter new skill:");
        if (newSkill) {
            setTicketInfo(ticketInfo.map((ticket, index) => {
                if (index === ticketIndex) {
                    return {
                        ...ticket,
                        skills: [...ticket.skills, newSkill]
                    };
                }
                return ticket;
            }));
        }
    };

    const removeSkill = (ticketIndex, skillIndex) => {
        setTicketInfo(ticketInfo.map((ticket, index) => {
            if (index === ticketIndex) {
                return {
                    ...ticket,
                    skills: ticket.skills.filter((_, sIndex) => sIndex !== skillIndex)
                };
            }
            return ticket;
        }));
    };

    return (
        <div>
            <Header></Header>
            <div className="container p-md-0">
    <div>
        <br></br>
        <br></br>
        <div className="az-dashboard-one-title">
            <div>
                <h2 className="az-dashboard-title">Welcome to the smart sprint starter!</h2>
                <p className="az-dashboard-text">Using AI to create JIRA stories and assign it to engineers based on our novel skill matching algorithm</p>
            </div>
        </div>{/* az-dashboard-one-title */}
        {/* {forms.map((form, index) => (
            <EditableForm
                key={index}
                data={form}
                updateMyData={(field, value) => updateMyData(index, field, value)}
                deleteRow={() => deleteForm(index)}
            />
        ))}
        <Button variant="primary" onClick={addForm} style={{ marginTop: '20px' }}>
            Add New Story
        </Button> */}
        <div style={{ borderBottom: '1px dotted #999', width: '100%', margin: '10px 0' }}></div>

        <div className="row row-sm mg-b-20">
            <div className="col-lg-4 ht-lg-100p">
                <div className="card card-table-one">
                    <h6 className="card-title">Sprint Planning MOM</h6>
                    <p className="az-content-text mg-b-20">The meeting details after sprint planning can be entered here</p>
                    <div className="form-group has-success mg-b-0">
                        
                        <Form.Control style={{ height: "400px" }} as="textarea" rows="3" className="mg-t-20" placeholder="Insert your MOM of Sprint Planning" required />
                    </div>{/* form-group */}
                    <br></br>
                    <div className="form-group has-success mg-b-0">
                    <Form.Group controlId="endDate">
                        <Form.Label>Sprint Start</Form.Label>
                        <DatePicker
                            selected={selectedDateSprintStart}
                            onChange={handleDateChangeSprintStart}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Select a date"
                            className="form-control"
                        />
                    </Form.Group>
                    </div>

                    <Form.Group controlId="endDate">
                        <Form.Label>Sprint End</Form.Label>
                        <DatePicker
                            selected={selectedDateSprintStart}
                            onChange={handleDateChangeSprintStart}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Select a date"
                            className="form-control"
                        />
                    </Form.Group>
                    <div className="form-group has-success mg-b-0">
                        <Button variant="primary btn-block">1. Create Sprint Items</Button>
                    </div>
                </div>
            </div>
            <div className="col-lg-8 ht-lg-100p">
                <div className="card card-table-special" >
                    <h6 className="card-title">Skills Assigned</h6>
                    <p className="az-content-text mg-b-20">The MOM will be AI processed to generate sprint items</p>
                    <div>
                        <h1></h1>
                        <h1></h1>
                        <SkillsTable data={ticketInfo} textKey="description" pillsKey="skills" />
                        <h1></h1>
                        <div className="form-group has-success mg-b-0">
                        <Button variant="primary btn-block">2. Assign Engineers</Button>
                        </div>
                    </div>{/* table-responsive */}
                </div>{/* card */}
            </div>
        </div>

        <div className="row row-sm mg-b-20">
            <div className="col-lg-12 ht-lg-100p">
                <div className="card card-table-special" >
                    <h6 className="card-title">Skills Assigned</h6>
                    <p className="az-content-text mg-b-20">The MOM will be AI processed to generate sprint items</p>
                    <div>
                        <h1></h1>
                        <h1></h1>
                        <SkillsTableFinal data={ticketInfo} textKey="description" pillsKey="skills" />
                        <h1></h1>
                        <div className="form-group has-success mg-b-0">
                            <Button variant="primary btn-block">3. Create JIRA Sprint</Button>
                        </div>
                    </div>{/* table-responsive */}
                </div>{/* card */}
            </div>
        </div>

        <div className="row row-sm mg-b-20">
            
        </div>
    </div>
</div>
        </div>
    );
};

export default StartSprint;
