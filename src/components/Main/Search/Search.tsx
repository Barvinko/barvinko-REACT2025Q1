import { Component, ReactNode } from 'react';
import './Search.css';

interface SearchProps {
  nameRequest: (name: string) => void;
}

export class Search extends Component<SearchProps> {
  state = {
    name: '',
  };

  handleSearchClick = () => {
    this.props.nameRequest(this.state.name);
  };

  render(): ReactNode {
    return (
      <section className="search">
        <input
          className="search__input"
          type="search"
          placeholder="Name..."
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </section>
    );
  }
}
