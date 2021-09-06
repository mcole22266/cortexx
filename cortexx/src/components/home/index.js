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
