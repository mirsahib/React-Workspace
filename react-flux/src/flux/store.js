import dispatcher from "./dispatcher";
 

class Emitter {

    constructor(){
        this.events = {}
    }
    on(eventName,callback){
        this.events[eventName] = this.events[eventName] || []
        this.events[eventName].push(callback)
    }
    emit(eventName){
        this.events[eventName].forEach(callback => callback())
    }
    removeListener(eventName,callback){
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }

}


class CounterStore extends Emitter {
    constructor() {
        super()
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
        this.emit('change')
    }    
}

const counterStore = new CounterStore();
dispatcher.register(counterStore.handleActions.bind(counterStore));

export default counterStore