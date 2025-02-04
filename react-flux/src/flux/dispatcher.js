

class Dispatcher {
    constructor(){
        this.callback = []
    }

    register(action){
        this.callback.push(action)
    }
    dispatch(action){
        this.callback.forEach((callback) => callback(action))
    }
}
const dispatcher = new Dispatcher()
export default dispatcher