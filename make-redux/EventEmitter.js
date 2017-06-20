class EventEmitter {
  /* TODO */
  constructor() {
    this.events = {};    
  }

  on(eventName, func) {
    let callbacks = eventName in this.events ? this.events[eventName] : [];
    callbacks.push(func);
    this.events[eventName] = callbacks;
  }

  emit(eventName, ...arg) {
    if (!eventName in this.events) { return; }
    callbacks = this.events[eventName];
    callbacks.map((fn) => {
      fn(...arg);
    })
  }

  off(eventName, func) {
    if (!eventName in this.events ) { return; }
    let callbacks = this.events[eventName];
    let index = callbacks.indexOf(func);
    callbacks.splice(index, 1);
  }
}
