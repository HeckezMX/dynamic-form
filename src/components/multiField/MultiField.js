import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import '../assets/css/multiField.css';

class MultiField extends Component {
  constructor() {
    super();
    this.state = {
      tmpID: '',
      openAlert: false,
      fields: [{ name: '' }],
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
   this.setState({ fields: this.state.fields.concat([{ name: '' }]) });
  }
  handleFieldNameChange = (inputId) => (evt) => {
  const newField = this.state.fields.map((field, id) => {
    if (inputId !== id) return field;
    return { ...field, name: evt.target.value };
  });
  this.setState({ fields: newField });
}
  /**
   * This function remove fields
   * @param  {[type]} inputID ID from the selected input
   */
  handleRemoveField = (inputID) => () => {
    this.setState({ fields: this.state.fields.filter((s, id) => inputID !== id) });
    this.handleCloseAlert();
  }
  handleOpenAlert = (inputID) => () => {
    this.setState({
      openAlert: true,
      tmpID: inputID,
    });
  };
  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  handleSubmit = () => {
    console.log('entre');
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseAlert}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onClick={this.handleRemoveField(this.state.tmpID)}
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
            icon={<FontIcon className="material-icons icon-save" />
          }/>
          <RaisedButton
            label="New Field"
            backgroundColor="#a4c639"
            icon={<FontIcon className="material-icons icon-add" />}
            onClick={this.handleAddField} />
        </div>
        <div className="multiField__form">
          <form onSubmit={this.handleSubmit}>
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
                  <TableRow>
                    <TableRowColumn>
                      <TextField
                        id={inputID + 1}
                        hintText="Field Name"
                        floatingLabelText="Field Name"
                        type="text"
                      />
                    </TableRowColumn>
                    <TableRowColumn>TRUE</TableRowColumn>
                    <TableRowColumn>Rules</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        icon={<FontIcon className="material-icons icon-edit" />}
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
          actions={actions}
          modal={false}
          open={this.state.openAlert}
          onRequestClose={this.handleCloseAlert}
        >
          Are you sure to discard this element?
        </Dialog>
      </div>
    );
  }
}
export default MultiField;
