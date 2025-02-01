import { Component, ReactNode } from 'react';
import { createLocalValue } from '../../../utilits/useLocalStorage';
import './Search.css';

interface SearchProps {
  nameRequest: (name: string) => void;
}

export class Search extends Component<SearchProps> {
  private _savedName = createLocalValue<string>(
    'Barvinko-classComponents__name'
  );

  state = {
    name: this._savedName.get(),
  };

  handleSearchClick = () => {
    this.props.nameRequest(this.state.name);
    this._savedName.set(this.state.name);
  };

  componentDidMount(): void {
    this.handleSearchClick();
  }

  render(): ReactNode {
    return (
      <section className="search">
        <input
          className="search__input"
          type="search"
          placeholder="Name..."
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </section>
    );
  }
}
