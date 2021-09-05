import { About } from "./about";
import { Crickets } from "./crickets";
import { Jumbotron } from "./jumbotron";
import { MiniBankJumbotron } from "./minibankjumbotron";

const about = About();
const crickets = Crickets();
const jumbotron = Jumbotron();
const minibankjumbotron = MiniBankJumbotron()

export function Home() {
  return (
    <div>

      { jumbotron }

      { about }

      { crickets }

      { minibankjumbotron }

    </div>
  );
}
