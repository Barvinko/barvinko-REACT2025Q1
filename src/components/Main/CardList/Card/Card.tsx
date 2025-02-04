import { Component, ReactNode } from 'react';
import { Character } from '../../../../types/types';

export class Card extends Component<Character> {
  render(): ReactNode {
    return (
      <div className="card">
        <div className="card__title">
          <h3>{this.props.name}</h3>
        </div>
        <div className="card__info">
          <p>Birth Year: {this.props.birth_year}</p>
          <p>Gender: {this.props.gender}</p>
          <p>Height: {this.props.height}</p>
          <p>Mass: {this.props.mass}</p>
          <p>
            <a href={this.props.url}>Link</a>
          </p>
        </div>
      </div>
    );
  }
}
