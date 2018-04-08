export const schema = {
  type: 'object',
  properties: {
    template: {
      title: 'Select template',
      type: 'string',
      enum: ['Default banner', 'Small banner'],
      default: '',
    },
  },
  required: ['template'],
  dependencies: {
    template: {
      oneOf: [
        {
          properties: {
            template: {
              enum: [''],
            },
          },
        },
        {
          properties: {
            template: {
              enum: ['Default banner'],
            },
            imageUrl: {
              type: 'string',
              title: 'Image url',
              default: '',
              minLength: 3,
            },
            description: {
              type: 'string',
              title: 'Description',
              default: '',
              minLength: 3,
            },
            date: {
              type: 'string',
              format: 'date',
              title: 'Date',
              default: '',
            },
            showPrices: {
              type: 'boolean',
              title: 'Show prices?',
              default: true,
              enumNames: ['Yes', 'No'],
            },
            showDates: {
              type: 'boolean',
              title: 'Show dates?',
              default: true,
              enumNames: ['Yes', 'No'],
            },
            locale: {
              type: 'string',
              title: 'Locale',
              pattern: '[a-z]+-[A-Z]+',
              default: '',
            },
          },
          required: ['imageUrl', 'description', 'date', 'showPrices', 'locale'],
        },
        {
          properties: {
            template: {
              enum: ['Small banner'],
            },
            'Do you want to get rid of any?': {
              type: 'boolean',
            },
          },
        },
      ],
    },
  },
};

export const uiSchema = {
  description: {
    'ui:widget': 'textarea',
  },
  showPrices: {
    'ui:widget': 'select',
  },
  locale: {
    'ui:widget': 'LocaleSelect',
  },
};

export const defaultValue = {
  template: 'Default banner',
  imageUrl: '',
  description: '',
  date: '',
  showPrices: false,
  locale: 'es-ES',
};
