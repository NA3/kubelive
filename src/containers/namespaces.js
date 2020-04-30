'use strict';
const k8sApi = require('../kube/api');
const React = require('react');
const importJsx = require('import-jsx');
const NamespacesComponent = importJsx('../components/namespaces');
const { Component } = require('react');
const { Color } = require('ink');
const PropTypes = require('prop-types');

class Namespaces extends Component {
  constructor(props) {
    super(props);
    this.state = { namespaces: [], err: undefined };
  }

  componentDidMount() {
    k8sApi
      .listNamespace()
      .then((response) => {
        const namespaces = response.body.items;

        this.setState({ namespaces: namespaces });

        // Trigger a first available namespace
        if (namespaces.length > 0) {
          this.props.onNamespaceChange(namespaces[0].metadata.name);
        }
      })
      .catch((err) => {
        this.setState({ ...this.state, err: err.code });
        if (process.env.NODE_ENV !== 'test') {
          // exit the process
          process.exit(1);
        }
      });
  }

  render() {
    if (this.state.err == undefined) {
      return (
        <NamespacesComponent
          onNamespaceChange={this.props.onNamespaceChange}
          namespaces={this.state.namespaces}
        />
      );
    } else {
      return (
        <Color red>
          Unable to connect to the kube cluster: {this.state.err}
        </Color>
      );
    }
  }
}

Namespaces.propTypes = {
  onNamespaceChange: PropTypes.func
};

module.exports = Namespaces;
