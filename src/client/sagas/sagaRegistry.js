export class SagaRegistry {
  constructor () {
    this._emitChange = null;
    this._sagas = [];
  }

  getSagas () {
    return [ ...this._sagas ];
  }

  register (saga) {
    this._sagas = [ ...this._sagas, saga ];
    // if (this._sagas.indexOf(saga) === -1) {
    //   this._sagas = [ ...this._sagas, saga ];
    //   if (this._emitChange) {
    //     this._emitChange(this.getSagas());
    //   }  
    // }
    if (this._emitChange) {
      this._emitChange(this.getSagas());
    }
  }

  setChangeListener (listener) {
    this._emitChange = listener;
  }
}

const sagaRegistry = new SagaRegistry();
export default sagaRegistry;
