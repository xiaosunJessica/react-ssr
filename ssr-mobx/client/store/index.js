import TestStore from './test';
class RootStore { 
	constructor() {
		this.testStore = new TestStore(this)
	}
}


export default RootStore