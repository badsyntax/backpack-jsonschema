import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import Form from 'react-jsonschema-form';

import {
  CheckboxWidget,
  SelectWidget,
  TextareaWidget,
  BaseInput,
  FieldTemplate,
  ErrorList,
  ObjectFieldTemplate,
  DescriptionField,
  DateWidget,
  LocaleSelect,
} from './Widgets';

const widgets = {
  CheckboxWidget,
  SelectWidget,
  TextareaWidget,
  BaseInput,
  ErrorList,
  DateWidget,
  LocaleSelect,
};

const fields = {
  DescriptionField,
};

class JsonSchemaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit({ formData }) {
    this.setState({
      submitted: true,
    });
    if (this.props.onSubmit) {
      this.props.onSubmit({ formData });
    }
  }

  onError({ errors }) {
    this.setState({
      submitted: true,
    });
    if (this.props.onError) {
      this.props.onError({ errors });
    }
  }

  render() {
    return (
      <Form
        widgets={widgets}
        FieldTemplate={FieldTemplate}
        showErrorList={false}
        ObjectFieldTemplate={ObjectFieldTemplate}
        fields={fields}
        noHtml5Validate
        formData={this.props.formData}
        onChange={this.onChange}
        liveValidate={this.state.submitted}
        {...this.props}
        onSubmit={this.onSubmit}
        onError={this.onError}
      >
        <BpkButton type="submit">Submit</BpkButton>
      </Form>
    );
  }
}

export default JsonSchemaForm;
