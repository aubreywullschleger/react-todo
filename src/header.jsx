var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: ''
    }
  },
  render: function(){
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={this.state.text}
          onChange={this.handleInputChange}
        />
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="btn btn-default"
            type="button">
          Add
          </button>
        </span>
      </div>
      )
  },
  handleClick: function() {
    this.props.itemsStore.push({
      text: this.state.text,
      done: false
    });
    this.setState({text: ''});
  },
  handleInputChange: function(event) {
    this.setState({
      text: event.target.value
    });
  }
});
