import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchEmployees, deleteEmployee } from '../features/employees/employeesSlice';
import EmployeeForm from './EmployeeForm';

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, error } = useSelector((state: RootState) => state.employees as any);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <EmployeeForm />
      {Array.isArray(employees) && employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(employees) ? (
            employees.map((employee) => (
              <div key={employee.id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p>{employee.email}</p>
                <p>{employee.position}</p>
                <div className="mt-4">
                  <EmployeeForm employee={employee} />
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Invalid employee data.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
