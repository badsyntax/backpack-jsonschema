import React, { Component } from "react";
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/github";
import BpkText from "bpk-component-text";
import BpkBannerAlert, { ALERT_TYPES } from "bpk-component-banner-alert";
import { BpkCodeBlock } from "bpk-component-code";
import BpkPanel from "bpk-component-panel";

import JsonSchemaForm from "../JsonSchemaForm/JsonSchemaForm";

import STYLES from "./FormBuilder.scss";

const c = className => STYLES[className] || "UNKNOWN";

const FormPane = props => (
  <div className={STYLES.FormPane}>{props.children}</div>
);

const SourcePane = props => (
  <div className={STYLES.SourcePane}>{props.children}</div>
);

class FormBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      formData: props.defaultValue,
      schemaJson: JSON.stringify(props.schema, null, 2),
      uiSchemaJson: JSON.stringify(props.uiSchema, null, 2)
    };
    this.onChange = this.onChange.bind(this);
    this.onSchemaChange = this.onSchemaChange.bind(this);
    this.onUiSchemaChange = this.onUiSchemaChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ formData }) {
    alert("Form is valid!");
  }

  onChange({ formData }) {
    this.setState({ formData });
  }

  onSchemaChange(value) {
    this.setState({
      schemaJson: value
    });
  }

  onUiSchemaChange(value) {
    this.setState({
      uiSchemaJson: value
    });
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
    console.log('error', error.preventDefault(), info);
    return false;
  }

  render() {
    let { formData } = this.state;
    let schema = {};
    let uiSchema = {};
    let hasSchemaError = this.state.hasError;
    try {
      schema = JSON.parse(this.state.schemaJson);
    } catch (e) {
      hasSchemaError = true;
      formData = {};
    }
    try {
      uiSchema = JSON.parse(this.state.uiSchemaJson);
    } catch (e) {
      hasSchemaError = true;
    }

    let form;

    try {
      form = React.createElement(JsonSchemaForm, {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData,
        onSubmit: this.onSubmit,
        onChange: this.onChange
      });
    } catch (e) {
      hasSchemaError = true;
      formData = {};
    }
    return (
      <div className={c("FormBuilder")}>
        <SourcePane>
          <BpkPanel className={c("SourcePane__editor")}>
            <BpkText
              className={c("SourcePane__editor-heading")}
              tagName="h2"
              textStyle="base"
            >
              Schema:
            </BpkText>
            <AceEditor
              mode="json"
              theme="github"
              onChange={this.onSchemaChange}
              value={this.state.schemaJson}
              name="UNIQUE_ID_OF_DIV"
              className={c("FormBuilder__editor")}
              width="100%"
              height={null}
              showGutter={false}
              showPrintMargin={false}
              highlightActiveLine={false}
              editorProps={{ $blockScrolling: true }}
            />
          </BpkPanel>
          <BpkPanel className={c("SourcePane__editor")}>
            <BpkText
              className={c("SourcePane__editor-heading")}
              tagName="h2"
              textStyle="base"
            >
              UI schema:
            </BpkText>
            <AceEditor
              mode="json"
              theme="github"
              onChange={this.onUiSchemaChange}
              value={this.state.uiSchemaJson}
              name="UNIQUE_ID_OF_DIV2"
              className={c("FormBuilder__editor")}
              width="100%"
              height={null}
              showGutter={false}
              showPrintMargin={false}
              highlightActiveLine={false}
              editorProps={{ $blockScrolling: true }}
            />
          </BpkPanel>
        </SourcePane>
        <FormPane>
          <BpkText tagName="h2" textStyle="lg">
            Generated form:
          </BpkText>
          <br />
          {hasSchemaError ? (
            <BpkBannerAlert
              message="Schema error. Please correct the schema JSON."
              type={ALERT_TYPES.ERROR}
            />
          ) : (
            form
          )}
          <br />
          <BpkText tagName="h2" textStyle="lg">
            Form values:
          </BpkText>
          <br />
          <BpkCodeBlock>{JSON.stringify(formData, null, 2)}</BpkCodeBlock>
        </FormPane>
      </div>
    );
  }
}

export default FormBuilder;
