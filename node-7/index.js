import sequelize from './config/db.js';
import App from './models/App.js';

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connected');

    await App.create({ name: 'Instagramm', size: 80 });
    await App.create({ name: 'Sygnal', size: 60 });

    const apps = await App.findAll();
    console.log(apps.map(a => a.toJSON()));
  } catch (e) {
    console.error(e);
  }
}

start();
