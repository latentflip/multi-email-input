import EmailInput from './multi-email-input.js';
import React from 'react';

let Demo = React.createClass({
  onChange(e) {
    console.log(e);
  },

  getInitialState() {
    return { controlledValue: [] };
  },

  onControlledChange(e) {
    this.setState({ controlledValue: e.target.value });
  },

  render() {
    return (
      <div>
        <p>Empty</p>
        <EmailInput onChange={this.onChange} />

        <hr/>
        <p>String value</p>
        <EmailInput onChange={this.onChange} defaultValue='phil@latentflip.com, bob@example.com'/>

        <hr/>
        <p>Array value</p>
        <EmailInput onChange={this.onChange} defaultValue={['phil@latentflip.com', 'bob@example.com']} />

        <hr/>
        <p>Controlled component</p>
        <EmailInput onChange={this.onControlledChange} value={this.state.controlledValue} />
        <p>{this.state.controlledValue}</p>
      </div>
    );
  }
});

requestAnimationFrame(() => {
  React.render(<Demo />, document.body);
});
