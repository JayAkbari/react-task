import { createServer, Model, Factory, Response } from 'miragejs';
import { Employee } from '../types';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      employee: Model.extend<Partial<Employee>>({}),
    },

    factories: {
      employee: Factory.extend({
        name(i: number) { return `Employee ${i + 1}`; },
        email(i: number) { return `employee${i + 1}@example.com`; },
        position(i: number) { return `Position ${i + 1}`; },
      }),
    },

    seeds(server: any) {
      server.createList('employee', 10);
    },

    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema: any) => {
        return schema.all('employee');
      });

      this.post('/employees', (schema: any, request: any) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('employee', attrs);
      });

      this.put('/employees/:id', (schema: any, request: any) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find('employee', id);
        if (employee) {
          return employee.update(attrs);
        } else {
          return new Response(404, {}, { error: 'Employee not found' });
        }
      });

      this.delete('/employees/:id', (schema: any, request: any) => {
        const id = request.params.id;
        const employee = schema.find('employee', id);
        if (employee) {
          employee.destroy();
          return new Response(204, {}, {});
        } else {
          return new Response(404, {}, { error: 'Employee not found' });
        }
      });
    },
  });
}