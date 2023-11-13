const { Application } = require('ee-core');

class Main extends Application {

  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready() {
    // do some things
  }

  /**
   * electron app ready
   */
  async electronAppReady() {
    // do some things
  }

  /**
   * main window have been loaded
   */
  async windowReady() {
  }

  /**
   * before app close
   */
  async beforeClose() {
    // do some things

  }
}

new Main();

