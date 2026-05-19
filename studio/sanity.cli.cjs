// CommonJS porque la CLI de Sanity carga este archivo con require().
// El resto del Studio sigue siendo ES module (sanity.config.js, schemas/, etc.).

module.exports = {
  api: {
    projectId: '6hy8kz7f',
    dataset: 'production',
  },
}
