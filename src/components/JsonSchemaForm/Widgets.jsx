import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'bpk-component-input';
import BpkLabel from 'bpk-component-label';
import BpkSelect from 'bpk-component-select';
import BpkTextarea from 'bpk-component-textarea';
import BpkDatepicker from 'bpk-component-datepicker';
import format from 'date-fns/format';
import BpkFormValidation from 'bpk-component-form-validation';

import STYLES from './WidgetStyles.scss';

const daysOfWeek = [
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    index: 6,
    isWeekend: true,
  },
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    index: 5,
    isWeekend: false,
  },
];
const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');

const getName = label =>
  (label || '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z-]/g, '')
    .toLowerCase();

const getId = getName;

export const DateWidget = props => (
  <BpkDatepicker
    id={props.id || getId(props.label)}
    daysOfWeek={daysOfWeek}
    changeMonthLabel="Change month"
    closeButtonText="Close"
    title={props.label}
    getApplicationElement={() =>
      document.getElementById('application-container')
    }
    formatDate={formatDateFull}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    onDateSelect={date => props.onChange(format(date, 'YYYY-MM-DD'))}
    date={props.value ? new Date(props.value) : null}
  />
);

DateWidget.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const BaseInput = ({
  id, label, type, value, onChange,
}) => (
  <BpkInput
    id={id || getId(label)}
    type={Object.keys(INPUT_TYPES).includes(type) ? type : INPUT_TYPES.text}
    name={id || getName(label)}
    value={value || ''}
    onChange={event => onChange(event.target.value)}
    clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
    clearButtonLabel="Clear"
    onClear={() => console.log('input cleared!')}
  />
);

BaseInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export const SelectWidget = ({
  label,
  value,
  id,
  options,
  schema,
  onChange,
}) => (
  <BpkSelect
    id={id || getId(label)}
    name={id || getName(label)}
    value={String(value === undefined ? '' : value)}
    onChange={event =>
      onChange(
        schema.type === 'boolean'
          ? event.target.value.toLowerCase() === 'true'
          : event.target.value,
      )
    }
  >
    {options.enumOptions.map(({ value, label }, i) => (
      <option key={i} value={value}>
        {label}
      </option>
    ))}
  </BpkSelect>
);

SelectWidget.propTypes = {
  schema: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    enumOptions: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        label: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export const TextareaWidget = ({
  id, label, value, onChange,
}) => (
  <BpkTextarea
    id={id || getId(label)}
    name={id || getName(label)}
    value={value || ''}
    onChange={event => onChange(event.target.value)}
  />
);

TextareaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export const CheckboxWidget = ({
  id, label, value, onChange,
}) => (
  <BpkCheckbox
    name={id || getName(label)}
    id={id || getId(label)}
    className={value ? 'checked' : 'unchecked'}
    label={label}
    onChange={event => onChange(event.target.checked)}
    checked={value}
  />
);

CheckboxWidget.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export const ErrorList = ({ errors, id }) =>
  (errors && errors.length ? (
    <BpkFormValidation id={`${id}-validation`} expanded>
      {errors[0]}
    </BpkFormValidation>
  ) : null);

ErrorList.propTypes = {
  id: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

ErrorList.defaultProps = {
  errors: null,
};

export const FieldTemplate = ({
  id,
  label,
  help,
  rawHelp,
  required,
  description,
  displayLabel,
  rawErrors,
  children,
}) => (
  <div className={STYLES.FormGroup}>
    {displayLabel &&
      label && (
        <BpkLabel htmlFor={id}>
          {label}
          {required ? '*' : null}
        </BpkLabel>
      )}
    {displayLabel && description}
    {children}
    <ErrorList errors={rawErrors} id={id} />
    {rawHelp && help}
  </div>
);

FieldTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.node,
  rawHelp: PropTypes.string,
  required: PropTypes.bool,
  description: PropTypes.node.isRequired,
  displayLabel: PropTypes.bool.isRequired,
  rawErrors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

FieldTemplate.defaultProps = {
  required: null,
  label: null,
  help: null,
  rawHelp: null,
  rawErrors: null,
};

export const ObjectFieldTemplate = ({ title, description, properties }) => (
  <div className="object-field">
    {title}
    {description}
    {properties.map((element, i) => element.content)}
  </div>
);

export const DescriptionField = ({ id, description }) =>
  (description ? <div id={id}>{description}</div> : null);

DescriptionField.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
};

DescriptionField.defaultProps = {
  description: null,
};

export class LocaleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          value: '',
          label: 'Loading...',
        },
      ],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      if (!this.isUnmounting) {
        this.setState({
          options: [
            {
              value: 'en-GB',
              label: 'English',
            },
            {
              value: 'es-ES',
              label: 'Spanish',
            },
          ],
        });
      }
    }, 2000);
  }

  componentWillUnmount() {
    this.isUnmounting = true;
  }

  render() {
    const props = this.props;
    console.log('VALUE', String(props.value === undefined ? '' : props.value));
    return (
      <BpkSelect
        id={props.id || getId(props.label)}
        name={props.id || getName(props.label)}
        value={String(props.value === undefined ? '' : props.value)}
        onChange={event => props.onChange(event.target.value)}
      >
        {this.state.options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </BpkSelect>
    );
  }
}
