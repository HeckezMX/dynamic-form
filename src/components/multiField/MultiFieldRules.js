import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import rulesData from '../../rules.json';

import '../assets/css/multiField.css';
const inlineStyles = {
  customWidth: {
    width: 200,
  },
  customWidthInputs: {
    width: 100,
    marginLeft: 15,
  },
};
class MultiFieldRules extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      rules: [],
    };
  }
  /**
   * Function that change the value of rule selected
   * @param  {[type]} objRule
   */
  handleChange = (objRule) => (event, index, values) => {
    objRule.name = values;
    let dataRules = this.state.rules;
    let fieldIndex = dataRules.findIndex(function(item) {
      return item.id === objRule.id;
    });
    dataRules[fieldIndex] = objRule;
    this.setState({ rules: dataRules });
  };

  /**
   * Function that add additional fields of validation to rule selected
   * @param  {[type]} objRule
   */
  handleAdditionalRules = (objRule) => {
    let items = rulesData.find(function(rule) {
      if(rule.name === objRule.name && rule.arguments && rule.arguments.length > 0) {
        return rule.arguments.map((argument, index) => argument);
        }
      });
      if(items) {
        return items.arguments.map(function(item) {
          return (
            <TextField key={item}
              hintText={item}
              type="text"
              style={inlineStyles.customWidthInputs}
            />
          )
        });
      }
    }

  /**
   * Function that add new rule
   * @param  {[type]} objRule
   */
  handleNewRule = () => {
    this.setState({ rules: this.state.rules.concat(
      [{
        id: String(this.state.rules.length + 1),
        name: ''
      }])
    });
  }

  /**
   * Function that create option list of rules
   * @param  {[type]} rulesData JSON of options
   */
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
      console.log(this.propTypes);
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
            onClick={this.handleNewRule}
          />
        </div>
        <div className="multiField-rules__content">
          {this.state.rules.map((rule, index) => (
            <div className="multiField-rules__content__rules" key={index}>
              <div className="rule">
                <SelectField
                  id = {String(rule.id)}
                  multiple={false}
                  hintText="Select a rule"
                  value={rule.name}
                  onChange={this.handleChange(rule)}
                  style={inlineStyles.customWidth}
                >
                  {this.menuItems(rulesData)}
                </SelectField>
              </div>
              <div className="additionals">
                {this.handleAdditionalRules(rule)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MultiFieldRules;
