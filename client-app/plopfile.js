module.exports = function(plop) {
  plop.setGenerator("Detail Page", {
    description: "React Detail page using our latest standards",
    prompts: [
      {
        type: "input",
        name: "destinationpath",
        message: "Destination Path (ex: C:/dev/Branches/.....):",
        validate: required('"destinationpath" is required')
      },
      {
        type: "input",
        name: "componentName",
        message: "Component Name:",
        validate: required('"Component Name" is required')
      }
    ],
    actions: [
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.api.handler.ts",
        templateFile: "src/templates/Detail/_DetailTemplate_.api.handler.hbs",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.api.json",
        templateFile: "src/templates/Detail/_DetailTemplate_.api.json",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.api.types.ts",
        templateFile: "src/templates/Detail/_DetailTemplate_.api.types.hbs",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx",
        templateFile: "src/templates/Detail/_DetailTemplate_.hbs",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}Presentational.tsx",
        templateFile: "src/templates/Detail/_DetailTemplate_Presentational.hbs",
        force: true
      },
      {
        type: "add",
        path: "{{destinationpath}}/{{camelCase componentName}}.stories.tsx",
        templateFile: "src/templates/Detail/_DetailTemplate_.stories.hbs",
        force: true
      }
    ]
  });

  plop.setGenerator("Print Page", {
    description: "React Print page with story & mocked data",
    prompts: [
      {
        type: "input",
        name: "destinationpath",
        message: "Destination Path (ex: C:/dev/Branches/.....):",
        validate: required('"destinationpath" is required')
      },
      {
        type: "input",
        name: "componentName",
        message: "Component Name:",
        validate: required('"Component Name" is required')
      }
    ],
    actions: [
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.api.handler.ts",
        templateFile: "src/templates/Print/_PrintTemplate_.api.handler.hbs",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.api.json",
        templateFile: "src/templates/Print/_PrintTemplate_.api.json",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.api.types.ts",
        templateFile: "src/templates/Print/_PrintTemplate_.api.types.hbs",
        force: true
      },
      {
        type: "add",
        path:
          "{{destinationpath}}/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx",
        templateFile: "src/templates/Print/_PrintTemplate_.hbs",
        force: true
      },
      {
        type: "add",
        path: "{{destinationpath}}/{{camelCase componentName}}.stories.tsx",
        templateFile: "src/templates/Print/_PrintTemplate_.stories.hbs",
        force: true
      }
    ]
  });
};

/** @param {string} [message] */
function required(message) {
  /** @param {string} [input] */
  return input => {
    if (!input) {
      console.warn(`\n\t${message}`);
      return false;
    }
    return true;
  };
}
