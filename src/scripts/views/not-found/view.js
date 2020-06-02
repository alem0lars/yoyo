import { config as particlesConfig } from "./particles";
import TypeIt from "typeit";

class NotFoundView {
  namespace = "not-found";

  async afterEnter(data) {
    await this._showParticles();
    await this._typeResourceNotFound();
    console.log("finished");
  }

  async _showParticles() {
    window.particlesJS("particles-js", particlesConfig);
  }

  async _typeResourceNotFound() {
    return new Promise((res, _) =>
      new TypeIt("#resource-not-found", {
        speed: 40,
        waitUntilVisible: true,
        afterComplete: (step, instance) => res(),
      })
        .type("RISORSA NON PRESENTE", { delay: 300 })
        .delete(8)
        .type("TROVATA", { delay: 200 })
        .move("START")
        .type("OPS, ", { delay: 100 })
        .move("END")
        .type(" !!")
        .go()
    );
  }
}

export { NotFoundView };
