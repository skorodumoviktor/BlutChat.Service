module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [{ name: 'seed' }])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {})
  },
}
