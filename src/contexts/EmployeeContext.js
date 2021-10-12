import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios'


export const EmployeeContext = createContext()

const EmployeeContextProvider  = (props) => {

    const [employees, setEmployees] = useState([])
        const fetch_api = 'https://dummy.restapiexample.com/api/v1/employees'
        const delete_api ='https://dummy.restapiexample.com/public/api/v1/delete'

        // const [fetchData, setfetchData] = useState([])
        // console.log(fetchData)
        Axios.get(fetch_api)
          .then((response) => {
            //   console.log(response.data.data)
            setEmployees(response.data.data)
          })
          .catch((error) => {
            console.log(error)
          })


        //    Axios.delete(delete_api, employees)
        //      .then((response) => {
        //          console.log(response)
        //      })
        //      .catch((error) => {
        //        console.log(error)
        //      })

    

useEffect(()=> {
    setEmployees(JSON.parse(localStorage.getItem('employees')))
},[])

useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
})



const sortedEmployees = employees.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addEmployee = (ID, Name, Salary, Age) => {
    setEmployees([...employees, { id: uuidv4(), ID, Name, Salary, Age }])
}

const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
}

const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
}

    return (
        <EmployeeContext.Provider value={{sortedEmployees, addEmployee, deleteEmployee, updateEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;