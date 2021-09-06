// index.js
// 2021-09-05
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Landing page for Cortexx
// ----------------------------

import About from "./about";
import Crickets from "./crickets";
import Jumbotron from "./jumbotron";
import MiniBankJumbotron from "./minibankjumbotron";

export function Home() {
  return (
    <div>

      <Jumbotron />

      <About />

      <Crickets />

      <MiniBankJumbotron />

    </div>
  );
}
