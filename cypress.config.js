const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'AutoForce | Regressivo Formulário Leads',    
    reportTitle: 'Regressivo Formulário de Leads',
    inlineAssets: true,
    showPassed: true,
    showFailed: true,
    code:false,
  },
  e2e: {
    baseUrl: 'http://testes.autoforce.com.br',
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },  
});
