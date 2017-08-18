import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import rulesData from '../../rules.json';

import '../assets/css/multiField.css';

class MultiFieldRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [],
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  menuItems = (rulesData) => {
    return rulesData.map(function(rule) {
      return (
        <MenuItem
          key={rule.name}
          insetChildren={true}
          value={rule.name}
          primaryText={rule.name}
        />
      )
    }
    );
  }
  render() {
    return (
      <div className="multiField-rules">
        <div className="multiField-rules__title">
          <h3>Rules</h3>
        </div>
        <div className="multiField-rules__actions">
          <RaisedButton
            label="New Rule"
            backgroundColor="#a4c639"
            icon={<FontIcon className="material-icons icon-add" />}
            // onClick={this.handleNewRule}
          />
        </div>
        <div className="multiField-rules__content">
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
      </div>
    );
  }
}

export default MultiFieldRules;
