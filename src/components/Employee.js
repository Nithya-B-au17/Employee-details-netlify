import { useContext, useState, useEffect } from 'react'
// import Axios from 'axios'
import { EmployeeContext } from '../contexts/EmployeeContext'
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import EditForm from './EditForm'

const Employee = ({ employee }) => {
//   const fetch_api = 'https://dummy.restapiexample.com/api/v1/employees'

//     const [fetchData, setfetchData] = useState ([])
//     console.log(fetchData)
//   Axios.get(fetch_api)
//     .then((response) => {
//     //   console.log(response.data.data)
//       setfetchData(response.data.data)
//     })
//     .catch((error) => {
//       console.log(error)
//     })

  const { deleteEmployee } = useContext(EmployeeContext)

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  useEffect(() => {
    handleClose()
  }, [employee])

  return (
    <>
      <td>{employee.id}</td>
      <td>{employee.employee_name}</td>
      <td>{employee.employee_salary}</td>
      <td>{employee.employee_age}</td>

      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className='btn text-warning btn-act'
            data-toggle='modal'
          >
            <i className='material-icons'>&#xE254;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={() => deleteEmployee(employee.id)}
            className='btn text-danger btn-act'
            data-toggle='modal'
          >
            <i className='material-icons'>&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theEmployee={employee} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Employee
