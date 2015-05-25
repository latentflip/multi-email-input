import React from 'react';
import css from './email-input-component.css';
import uniq from 'lodash.uniq';

let toArray = function (str) {
  str = str || [];
  if (Array.isArray(str)) {
    return str;
  }
  return str.split(',').map(s => s.trim())
};

let KEYS = {
  comma: 188,
  enter: 13
};

let Email = React.createClass({
  onDelete() {
    this.props.onDelete({
      target: {
        name: this.props.name,
      }
    });
  },

  render() {
    return (
      <span className='email-multi-input__item'>
        <input className='email-multi-input__item__input' {...this.props}/>
        <button
          type='button'
          className='email-multi-input__item__delete'
          onClick={this.onDelete}>✖</button>
      </span>
    );
  }
});

export default React.createClass({
  getInitialState() {
    return {
      emails: toArray(this.props.defaultValue || this.props.value),
      next: ''
    };
  },

  getDefaultProps() {
    return {
      onChange: function() {},
      value: [],
    };
  },

  updateEmail(e) {
    e.preventDefault();
    let emails = this.state.emails.slice(0);
    emails[parseInt(e.target.name, 10)] = e.target.value;
    this.setEmails(emails);
  },

  updateNext(e) {
    e.preventDefault();
    this.setState({ next: e.target.value });
  },

  onKeyDown(e) {
    if (e.keyCode === KEYS.comma || e.keyCode === KEYS.enter ) {
      e.preventDefault();
      let addedEmails = e.target.value.split(',').map(t => t.trim());

      this.setEmails(this.state.emails.concat(addedEmails), { clear: true })
    }
  },

  onPaste(e) {
    let text = e.clipboardData.getData('text');
    if (text.indexOf(',') >= 0) {
      e.preventDefault();
      let addedEmails = text.replace(/\n/g, ', ').split(',').map(t => t.trim());
      this.setEmails(this.state.emails.concat(addedEmails), { clear: true });
    }
  },

  onDelete(e) {
    let emails = this.state.emails.slice(0);
    emails.splice(parseInt(e.target.name, 10), 1);
    this.setEmails(emails);
  },

  setEmails(emails, options={clear}) {
    emails = uniq(emails);

    if (this.state.emails.join(',') !== emails.join(',')) {
      this.setState({
        emails: emails,
        next: options.clear ? '': this.state.next
      }, () => {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: this.state.emails,
            valueAsString: this.state.emails.join(',')
          }
        });
      });
    }
  },

  giveFocus(e) {
    if (e.target === React.findDOMNode(this.refs.container)) {
      React.findDOMNode(this.refs.newInput).focus();
    }
  },

  onFocus() {
    this.setState({ focus: true });
  },

  onBlur() {
    this.setState({ focus: false });
  },

  render() {
    let { emails } = this.state;
    let classes = [
      'email-multi-input',
      this.state.focus ? 'focus' : 'blur'
    ].join(' ');

    console.log('NEXT', this.state.next);

    return (
      <div
        className={classes}
        ref='container'
        onClick={this.giveFocus}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        >
        {emails.map((e,i) => {
          return (
            <Email
              value={e}
              key={i}
              name={i}
              type='email'
              size={e.length + 2}
              onChange={this.updateEmail}
              onDelete={this.onDelete}
              />
          );
        })}
        <input
          className='email-multi-input__new'
          type='email'
          onKeyDown={this.onKeyDown}
          onChange={this.updateNext}
          onPaste={this.onPaste}
          value={this.state.next}
          size={Math.max(this.state.next.length + 3, 20)}
          ref='newInput'
          placeholder='you@reaweso.me'
          id={this.props.id}
          />
      </div>
    );
  }
})
