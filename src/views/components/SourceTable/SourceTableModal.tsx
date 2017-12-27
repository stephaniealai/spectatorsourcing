import * as React from 'react';
import * as Modal from 'react-modal';
import { graphql } from 'react-apollo';
import * as gql from 'graphql-tag';

const ADD_SOURCE_MUTATION = gql`
  mutation AddSourceMutation(
    $name: String!
    $organization: String!
    $phone: String!
    $email: String!
    $notes: String!
  ) {
    addSource(
      name: $name
      organization: $organization
      phone: $phone
      email: $email
      notes: $notes
    ) {
      id
    }
  }
`;
class SourceTableModal extends React.Component<any, any> {
  public state = {
    name: '',
    organization: '',
    phone: '',
    email: '',
    notes: '',
  };

  public createSource = async event => {
    event.preventDefault();
    const { name, organization, phone, email, notes } = this.state;
    await this.props.addSourceMutation({
      variables: {
        name,
        organization,
        phone,
        email,
        notes,
      },
    });
    this.props.onRequestClose();
    return false;
  };

  public render() {
    return (
      <Modal {...this.props}>
        <h1>Add a Source</h1>
        <form onSubmit={this.createSource}>
          <div>
            <label htmlFor="name">Source Name: </label>
            <input
              id="name"
              onChange={event =>
                this.setState({
                  name: event.target.value,
                })
              }
              value={this.state.name}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="organization">Source Organization: </label>
            <input
              id="organization"
              onChange={event =>
                this.setState({
                  organization: event.target.value,
                })
              }
              value={this.state.organization}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="phone">Source Phone: </label>
            <input
              id="phone"
              onChange={event =>
                this.setState({
                  phone: event.target.value,
                })
              }
              type="tel"
            />
          </div>
          <div>
            <label htmlFor="email">Source Email: </label>
            <input
              type="email"
              onChange={event =>
                this.setState({
                  email: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="notes">Notes: </label>
            <input
              id="notes"
              onChange={event =>
                this.setState({
                  notes: event.target.value,
                })
              }
              type="text"
            />
          </div>
          <input type="submit" value="Create" />
        </form>
      </Modal>
    );
  }
}

export default graphql(ADD_SOURCE_MUTATION, { name: 'addSourceMutation' })(
  SourceTableModal
);
