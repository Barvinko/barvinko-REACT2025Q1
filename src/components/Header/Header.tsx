import { Component, ReactNode } from 'react';
import './Header.css';

export class Header extends Component {
  render(): ReactNode {
    return (
      <header className="header">
        <h1 className="header__title">The Characters of StarWars</h1>
      </header>
    );
  }
}
