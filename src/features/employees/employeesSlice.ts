import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types';

interface EmployeesState {
  employees: Employee[];
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  error: null,
};

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetch('/api/employees');
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee: Omit<Employee, 'id'>) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return response.json();
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: Employee) => {
  const response = await fetch(`/api/employees/${employee.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return response.json();
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number) => {
  await fetch(`/api/employees/${id}`, { method: 'DELETE' });
  return id;
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        state.employees = state.employees.filter((e) => e.id !== action.payload);
      });
  },
});

export default employeesSlice.reducer;