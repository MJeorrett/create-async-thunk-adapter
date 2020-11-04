import { createServer, Factory, Model } from 'miragejs';

createServer({
  models: {
    field: Model,
    fieldSummary: Model,
    stepSummary: Model,
  },
  routes() {
    this.namespace = 'api';

    this.get('field-summaries');
    this.get('step-summaries');

    this.post('fields', function (schema, request) {
      const attrs = JSON.parse(request.requestBody);
      const createResult = schema.create('field', attrs);
      // @ts-ignore
      schema.fieldSummaries.create({
        id: createResult.attrs.id,
        label: createResult.attrs.label,
      });

      return createResult;
    });

    this.get('fields/:id');
    
    // @ts-ignore
    this.put('fields/:id', function (schema, request) {
      const fieldSummary = schema.find('fieldSummary', '3');
      if (!fieldSummary) throw new Error(`No field summary exists with id ${3}.`);
      fieldSummary?.update(JSON.parse(request.requestBody));
      const field = schema.find('field', '3');
      if (!field) throw new Error(`No field exists with id ${3}.`);
      return field.update(JSON.parse(request.requestBody));
    })
  },
  factories: {
    field: Factory.extend({
      label(i: number) {
        return `Field ${i + 1}`;
      },
      helpText(i: number) {
        return `Help text for field ${i + 1}`;
      },
    }),
    fieldSummary: Factory.extend({
      label(i: number) {
        return `Field ${i + 1}`;
      },
    }),
    stepSummary: Factory.extend({
      label(i: number) {
        return `Step ${i + 1}`;
      },
    }),
  },
  seeds(server) {
    server.createList('field', 10);
    server.createList('fieldSummary', 10);
    server.createList('stepSummary', 5);
  },
});
