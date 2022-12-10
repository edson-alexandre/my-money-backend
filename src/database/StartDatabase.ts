import { dataSource } from './AppDatasource';

export default class StartDatabase {
  async init(): Promise<void> {
    await dataSource
      .initialize()
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Conexão com o banco de dados iniciada!');
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Erro ao iniciar conexão com o banco de dados', err);
      });
  }
}
