var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://my-first-react-app.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return (
      <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">
          to-do list
          </h2>
          <Header itemsStore={this.firebaseRefs.items}/>
          <hr/>
          <div className={"content " + (this.state.loaded ? "loaded" : "")}>
            <List items={this.state.items}/>
            {this.deleteButton()}
          </div>
        </div>
      </div>
      )
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr/>
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
          clear completed
        </button>
      </div>
      }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
