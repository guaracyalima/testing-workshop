# client web
- Projeto do treinamento de automação de testes no mundo JavaScript
- Crud de clientes com NodeJS
- Front end com AngularJS

## Como rodar?
```bash
  npm start
```

## Como rodar os testes em modo whatch local?
```bash
npm test
```

## Como rodar os testes em producao?
```bash
npm test-prod
```

### Dependencias
- jasmine
- karma
- karma-cli
- karma-jasmine
- karma-phantomjs-launcher
- karma-coverage-istanbul-reporter

**Pelo fato de o es5+ não ser totalmente 'interpretado' pelo browser, precisamos das seguintes dependencias responsives para o transpile**

- @babel/core
- @babel/preset-env
- babel-polyfill
- karma-babel-preprocessor
---
### Configurações adicionais do karma
---
1. No objeto **files** do `karma.conf.js` precisamos adicionar como primeiro arquivo o `node_modules/@babel/polyfill/dist/polyfill.js`

2. No objeto de **plugins** do do `karma.conf.js` adicionaremos:
* `karma-jasmine`
* `karma-phantomjs-launcher`
* `karma-babel-preprocessor`

3. Precisamos ainda adicionar no objeto **processors** a indicação do transpiler, ex.:
`'spec/**/*.js': ['babel']`

4. Por fim, criaremos o objeto **babelPreprocessor** que se encarregará de referenciar os pressets:
```javascript
babelPreprocessor: {
    options: {
      presets: ['@babel/preset-env']
    }
  },
```

5. Para configurar `reporters` de `coverage`, é necessario registrar o plugin `karma-coverage` no array de plugins do arquivo `karma.conf.js`

### Istambul Reporter

- Adicionar dependencias `karma-coverage-istanbul-reporter`
- Adicionar a configuração do relatorio no `karma.conf.js`.:
```javascript
coverageIstanbulReporter: {
  // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
  reports: ['html', 'lcovonly', 'text-summary'],
  dir: path.join(__dirname, 'coverage'),

  // Combines coverage information from multiple browsers into one report rather than outputting a report
  // for each browser.
  combineBrowserReports: true,

  // if using webpack and pre-loaders, work around webpack breaking the source path
  fixWebpackSourcePaths: true,

  // Omit files with no statements, no functions and no branches covered from the report
  skipFilesWithNoCoverage: true,

  // Most reporters accept additional config options. You can pass these through the `report-config` option
  'report-config': {
    // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
    html: {
      // outputs the report in ./coverage/html
      subdir: 'html'
    }
  },

  // enforce percentage thresholds
  // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
  thresholds: {
    emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
    // thresholds for all files
    global: {
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100
    },
    // thresholds per file
    each: {
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100,
      overrides: {
        'app/**/*.js': {
          statements: 98
        }
      }
    }
  },

  verbose: true // output config used by istanbul for debugging
},
```
- Adicionar o reporter `coverage-istanbul`
- O plugin `karma-coverage-istanbul-reporter` deve ser registrado
- É dependencia do intanbul adicionar a importação de `path`:
```javascript
const path = require('path');
```
