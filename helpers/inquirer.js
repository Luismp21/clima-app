import pkg from "colors";
import inquirer from "inquirer";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Seleccione una opción ",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"3.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===================================".green);
  console.log("       Seleccione una opción       ".green);
  console.log("===================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "nombre",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Ingrese un valor valido";
        }
        return true;
      },
    },
  ];

  const { nombre } = await inquirer.prompt(question);
  return nombre;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, indice) => {
    const idx = `${indice + 1}.`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const question = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar: ",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);

  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, indice) => {
    const idx = `${indice + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
};

export {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};
