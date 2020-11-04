class Queuing {
    constructor() {
        this.queue = [];
        this.paused = false;
    }

    addToQueue(object, firstElementExecute = true, notExecButSkip = false) {
        return new Promise((resolve, reject) => {
            let funcType = false;
            if (object.afterEvent) {
                if (!object.afterEvent.emitter || !object.afterEvent.event) return reject("Missing emitter or event options in afterEvent");
            }
            if (typeof (object.value) == "function") {
                object.args = object.args || [];
                if (!Array.isArray(object.args)) return reject("Args option needs to be an array");
                funcType = true;
            }

            let newObject = Object.assign(object, {
                resolve,
                reject,
                "functionType": funcType,
                "eventNeed": object.afterEvent ? true : false
            });
            this.queue.push(newObject);
            if (notExecButSkip && this.queue.length == 1) return this._queueNextUp(newObject);
            if (!firstElementExecute && object.afterEvent != null && this.queue.length == 1) return this._queueNextUp(newObject, true);
            if (firstElementExecute && this.queue.length == 1 && this.paused == false) this._executeQueue(resolve, reject);
        });
    }

    _executeQueue(resolve, reject) {
        if (this.queue.length == 0) return;
        if (this.paused) return;
        else {
            let queueF = this.queue[0];
            let realResolve = resolve || queueF.resolve;
            let realReject = reject || queueF.reject;
            if (queueF.functionType) { //means it's a function
                try {
                    let result = queueF.value(...queueF.args);
                    if (result && result.then) { //It's a promise
                        if (queueF.eventNeed) this._queueNextUp(queueF);
                        result.then((...promiseRe) => {
                            if (!Array.isArray(promiseRe)) promiseRe = [promiseRe];
                            realResolve(...promiseRe);
                            if (!queueF.eventNeed) this._queueNextUp(queueF);
                        });

                        result.catch((...errors) => {
                            if (!Array.isArray(errors)) errors = [errors];
                            realReject(...errors);
                            if (!queueF.eventNeed) this._queueNextUp(queueF);
                        });
                    } else { //Not returning a promise
                        if (!Array.isArray(result)) result = [result];
                        realResolve(...result);
                        this._queueNextUp(queueF);
                    }
                } catch (e) {
                    realReject(e);
                    this._queueNextUp(queueF);
                }
            } else {
                realResolve(queueF.value);
                this._queueNextUp(queueF);
            }
        }
    }

    _queueNextUp(queueF, skip = false) {
        let $this = this;
        if (skip) {
            let emitter = typeof (queueF.afterEvent.emitter) == "function" ? queueF.afterEvent.emitter() : queueF.afterEvent.emitter;
            if (!emitter) return
            return emitter.once(queueF.afterEvent.event, waitingToPassSkip.bind(this, queueF));
        }
        if (queueF.eventNeed) {
            let emitter = typeof (queueF.afterEvent.emitter) == "function" ? queueF.afterEvent.emitter() : queueF.afterEvent.emitter;
            if (!emitter) return
            emitter.once(queueF.afterEvent.event, waitingToPass.bind(this, queueF));
        } else {
            setTimeout(() => { // Adding a timeout of 5 ms so if the user pause the queue direclty after one finish it will be paused
                if (this.paused) return;
                this.queue.shift();
                this._executeQueue();
            }, 5);
        }
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
        this._executeQueue();
    }

    unQueue(ind = 0) {
        return new Promise((resolve, reject) => {
            if (!this.queue[ind]) return reject("Nothing found with this index");
            this.queue.splice(ind, 1);
        });
    }

    get allQueueArgs() {
        let array = [];
        this.queue.forEach(object => {
            array.push(...object.args);
        });
        return array;
    }

    get allQueueValues() {
        let array = [];
        this.queue.forEach(object => {
            array.push(object.value);
        });
        return array;
    }

    clearQueue() {
        this.queue = [];
    }
}

function waitingToPass(queueF) {
    let $this = this;
    setTimeout(() => {
        if ($this.paused) return;
        $this.queue.shift();
        $this._executeQueue();
    }, 5);
}

function waitingToPassSkip(queueF) {
    let $this = this;
    setTimeout(() => {
        if ($this.paused) return;
        $this._executeQueue();
    }, 5);
}

module.exports = Queuing;
