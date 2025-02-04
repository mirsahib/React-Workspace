import dispatcher from "./dispatcher";
 

class CounterStore {
    constructor() {
        this.count = parseInt(localStorage.getItem('count'),10) ||0;
        this.listener = []
    }
    getCount(){
        return this.count
    }
    handleActions(action) {
        switch (action.type) {
            case 'INCREMENT':
                this.count++;
                break;
            case 'DECREMENT':
                this.count--;
                break;
            case 'RESET':
                this.count = 0;
                break;
            default:
                break;
        }
        localStorage.setItem('count',this.count)
        this.listener.forEach(listener => listener())
    }
    subscribe(listener) {
        this.listener.push(listener)
    }
    unsubscribe(listener) {
        this.listener = this.listener.filter(l => l !== listener)
    }
}

const counterStore = new CounterStore();
dispatcher.register(counterStore.handleActions.bind(counterStore));

export default counterStore