const { Sequelize } = require('sequelize');

// استخدم قاعدة بيانات مختلفة للـ local لتجنب SSL
const databaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL_RENDER   // Render
  : process.env.DATABASE_URL_LOCAL;   // local development

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }  // SSL فقط على Render
      : false                           // بدون SSL على المحلي
  },
  logging: console.log, // هذا لتتبع الاتصال
});

module.exports = sequelize;


