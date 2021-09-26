// crickets.js
// 2021-09-05
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Crickets Component Landing Page
// ----------------------------

import { Component } from "react";

export default class Crickets extends Component {

  render() {
    return (
      <div className='container embedded-video'>
        <iframe 
          src="https://www.youtube.com/embed/eKmRkS1os7k"
          title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
    );
  }
}
