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
  private _regexName = /^[a-zA-Z0-9\s-]*$/;

  state = {
    name: this._savedName.get(),
    errorMessage: '',
  };

  private handleSearchClick = () => {
    const trimmedName = this.state.name.trim();
    this.props.nameRequest(trimmedName);
    this._savedName.set(trimmedName);
  };

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (this._regexName.test(name)) {
      this.setState({ name, errorMessage: '' });
    } else {
      this.setState({
        errorMessage: 'Only letters, numbers, spaces, and hyphens are allowed.',
      });
    }
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
          onChange={(event) => this.handleInputChange(event)}
        />
        <button onClick={this.handleSearchClick}>Search</button>
        {this.state.errorMessage && (
          <p className="search__error-message">{this.state.errorMessage}</p>
        )}
      </section>
    );
  }
}
