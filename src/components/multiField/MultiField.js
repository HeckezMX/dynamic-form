import React, { Component } from 'react';
import MultiFieldRules from './MultiFieldRules';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';

import '../assets/css/multiField.css';

class MultiField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpID: '',
      openAlert: false,
      openEditor: false,
      fields: [],
    };
    // Table Config
    this.tableConfig = {
      showCheckboxes: false,
    };
  }

  /**
   * This function adds new fields
   */
  handleAddField = () => {
   this.setState({ fields: this.state.fields.concat(
     [{
       id: String(this.state.fields.length + 1),
       name: '',
       isRequired: false,
       rules: {}
     }])
   });
  }

  /**
   * This function update the field name
   * @param  {[type]} objField ID from the selected input
   */
  handleFieldNameChange = (objField) => (evt) => {
    objField.name = evt.target.value;
    let dataFields = this.state.fields;
    let fieldIndex = dataFields.findIndex(function(item) {
      return item.id === objField.id;
    });
    dataFields[fieldIndex] = objField;
    this.setState({ fields: dataFields });
  }

  /**
   * This function remove fields
   * @param  {[type]} inputID ID from the selected input
   */
  handleRemoveField = (inputID) => () => {
    this.setState({ fields: this.state.fields.filter((s, id) => inputID !== id) });
    this.handleCloseAlert();
  }

  /**
   * This function change status to field property isRequired
   * @param  {[type]} objField Object from the selected checkbox
   */
  handleUpdateCheck = (objField) => () => {
    objField.isRequired = (objField.isRequired) ? false : true;
    let dataFields = this.state.fields;
    let fieldIndex = dataFields.findIndex(function(item) {
      return item.id === objField.id;
    });
    dataFields[fieldIndex] = objField;
    this.setState({ fields: dataFields });
  }

  /**
   * This function change status to openAlert to remove element
   * @param  {[type]} inputID Object from the selected checkbox
   */
  handleOpenAlert = (inputID) => () => {
    this.setState({
      openAlert: true,
      tmpID: inputID,
    });
  };

  /**
   * This function close the Alert Dialog
   */
  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  /**
   * This function open the Editor of element
   * @param  {[type]} inputID Object from the selected
   */
  handleOpenEditor = (inputID) => () => {
    this.setState({
      openEditor: true,
      tmpID: inputID,
    });
  };

  /**
   * This function close the Editor Dialog
   */
  handleCloseEditor = () => {
    this.setState({ openEditor: false });
  };

  /**
   * This function submit the data
   */
  handleSubmit = () => {
    console.log(this.state.fields);
  }

  render() {
    const actionsAlert = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseAlert}
      />,
      <FlatButton
        label="Discard"
        secondary={true}
        onClick={this.handleRemoveField(this.state.tmpID)}
      />,
    ];
    const actionsEditor = [
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.handleCloseEditor}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleCloseEditor}
      />,
    ];
    return (
      <div className="multiField">
        <div className="multiField__title">
          <h1>Fields</h1>
        </div>
        <div className="multiField__actions">
          <RaisedButton
            label="Save"
            primary={true}
            icon={<FontIcon className="material-icons icon-save"
            onClick={this.handleSubmit} />
          }/>
          <RaisedButton
            label="New Field"
            backgroundColor="#a4c639"
            icon={<FontIcon className="material-icons icon-add" />}
            onClick={this.handleAddField} />
        </div>
        <div className="multiField__form">
          <form>
            <Table selectable={false}>
              <TableHeader displaySelectAll={this.tableConfig.showCheckboxes} adjustForCheckbox={this.tableConfig.showCheckboxes}>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Required</TableHeaderColumn>
                  <TableHeaderColumn>Rules</TableHeaderColumn>
                  <TableHeaderColumn>Actions</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={this.tableConfig.showCheckboxes}>
                {this.state.fields.map((field, inputID) => (
                  <TableRow key={inputID + 1}>
                    <TableRowColumn>
                      <TextField
                        id={field.id}
                        hintText="Field Name"
                        floatingLabelText="Field Name"
                        type="text"
                        onChange={this.handleFieldNameChange(field)}
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <Checkbox
                        checked={field.isRequired}
                        onCheck={this.handleUpdateCheck(field)}
                      />
                    </TableRowColumn>
                    <TableRowColumn>Rules</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        icon={<FontIcon className="material-icons icon-edit" />}
                        onClick={this.handleOpenEditor(inputID)}
                      />
                      <RaisedButton
                        secondary={true}
                        icon={<FontIcon className="material-icons icon-delete" />}
                        onClick={this.handleOpenAlert(inputID)}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </form>
        </div>
        <Dialog
          actions={actionsAlert}
          modal={false}
          open={this.state.openAlert}
          onRequestClose={this.handleCloseAlert}
        >
          Are you sure to discard this element?
        </Dialog>
        <Dialog
          actions={actionsEditor}
          modal={false}
          open={this.state.openEditor}
          onRequestClose={this.handleCloseEditor}
        >
          <MultiFieldRules />
        </Dialog>
      </div>
    );
  }
}
export default MultiField;
