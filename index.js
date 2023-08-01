import "dotenv/config";

import {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostar mensajes
        const terminoBusqueda = await leerInput();

        //Buscar lugares
        const lugares = await busquedas.ciudad(terminoBusqueda);

        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        const lugarSeleccionado = lugares.find((lugar) => lugar.id === id);

        //Guarda en DB
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSeleccionado.nombre.green);
        console.log("Lat:", lugarSeleccionado.lat);
        console.log("Lng:", lugarSeleccionado.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Mínima:", clima.min);
        console.log("Máxima:", clima.max);
        console.log("Como está el clima:", clima.desc.green);
        break;

      case 2:
          busquedas.historialCapitalizado.forEach( (lugar, indice) => {
            const idx = `${indice + 1}`.green;
            console.log(`${idx} ${lugar}`);
          })
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
