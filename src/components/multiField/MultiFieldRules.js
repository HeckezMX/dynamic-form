import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import rulesData from '../../rules.json';

class MultiFieldRules extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  menuItems(rulesData) {
    return rulesData.map((rule) => (
      <MenuItem
        key={rule.name}
        insetChildren={true}
        // checked={this.state.values.indexOf(person.value) > -1}
        value={rule.name}
        primaryText={rule.name}
      />
    ));
  }
  render() {
    return (
      <div className="multiField-rules">
        <SelectField
          multiple={false}
          hintText="Select a rule"
          value={this.state.value}
          onChange={this.handleChange}
          selectionRenderer={this.selectionRenderer}
        >
          {this.menuItems(rulesData)}
        </SelectField>
      </div>
    );
  }
}

export default MultiFieldRules;
