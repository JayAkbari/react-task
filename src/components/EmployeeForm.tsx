import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addEmployee, updateEmployee } from '../features/employees/employeesSlice';
import { Employee } from '../types';

interface EmployeeFormProps {
  employee?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [position, setPosition] = useState(employee?.position || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      dispatch(updateEmployee({ id: employee.id, name, email, position }));
    } else {
      dispatch(addEmployee({ name, email, position }));
    }
    setName('');
    setEmail('');
    setPosition('');
  };
  console.log('employee', name, email, position);
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-2 py-1 mr-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-2 py-1 mr-2"
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="border rounded px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {employee ? 'Update' : 'Add'} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;