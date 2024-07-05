import React, { Component } from 'react';
import './Loader.scss';

class LoaderComponent extends Component {
  public render(): React.JSX.Element {
    return (
      <div className="loader">
        <div className="bb-8">
          <div className="bb-8__head">
            <div className="bb-8__head__antenna" />
            <div className="bb-8__head__antenna--longer" />
            <div className="bb-8__head__top">
              <div className="bb-8__head__top__bar--gray" />
              <div className="bb-8__head__top__bar--red" />
              <div className="bb-8__head__top__lens">
                <div className="bb-8__head__top__lens__inner" />
              </div>
              <div className="bb-8__head__top__lens--secondary">
                <div className="bb-8__head__top__lens--secondary__inner" />
              </div>
              <div className="bb-8__head__top__bar--red--lower--left" />
              <div className="bb-8__head__top__bar--red--lower--right" />
              <div className="bb-8__head__top__bar--gray--lower" />
            </div>
            <div className="bb-8__head__joint" />
          </div>
          <div className="bb-8__head-shadow" />
          <div className="bb-8__body">
            <div className="bb-8__body__circle bb-8__body__circle--one">
              <div className="bb-8__body__circle__bar bb-8__body__circle--one__bar--one" />
              <div className="bb-8__body__circle__bar bb-8__body__circle--one__bar--two" />
              <div className="bb-8__body__circle--one__inner-circle" />
              <div className="bb-8__body__circle--one__inner-border" />
            </div>
            <div className="bb-8__body__circle bb-8__body__circle--two">
              <div className="bb-8__body__circle__bar bb-8__body__circle--two__bar--one" />
              <div className="bb-8__body__circle--two__inner-border" />
            </div>
            <div className="bb-8__body__circle bb-8__body__circle--three">
              <div className="bb-8__body__circle__bar bb-8__body__circle--three__bar--one" />
              <div className="bb-8__body__circle__bar bb-8__body__circle--three__bar--two" />
              <div className="bb-8__body__circle--three__inner-circle" />
              <div className="bb-8__body__circle--three__inner-border" />
            </div>
            <div className="bb-8__body__line bb-8__body__line--one" />
            <div className="bb-8__body__line bb-8__body__line--two" />
            <div className="bb-8__body__line bb-8__body__line--three" />
            <div className="bb-8__body__screw bb-8__body__screw--one" />
            <div className="bb-8__body__screw bb-8__body__screw--two" />
            <div className="bb-8__body__screw bb-8__body__screw--three" />
            <div className="bb-8__body__screw bb-8__body__screw--four" />
            <div className="bb-8__body__screw bb-8__body__screw--five" />
            <div className="bb-8__body__screw bb-8__body__screw--six" />
          </div>
          <div className="bb-8__body-shadow" />
        </div>
      </div>
    );
  }
}

export default LoaderComponent;
