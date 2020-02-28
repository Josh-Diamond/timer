import React, { Component } from 'react'

export default class Timer extends Component {
    state = {
        timerStarted: false,
        timerStopped: true,
        hours: 0,
        minutes: 0,
        seconds: 0,
        saved: [],
        user: '',
        event: '',
    }
    
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    start = () => {
        if(this.state.timerStopped) {
            this.timer = setInterval(() => {
                this.setState({ timerStarted: true, timerStopped: false});
                if(this.state.timerStarted) {
                    if(this.state.seconds === 60) {
                        this.setState(prevState => ({ minutes: prevState.minutes + 1, seconds: 0}))
                    }
                    if(this.state.minutes === 60) {
                        this.setState(prevState => ({ hours: prevState.hours + 1, minutes: 0}))
                    }
                    this.setState(prevState => ({ seconds: prevState.seconds + 1}))
                }
            }, 1000)
        }
    }

    stop = () => {
        this.setState({ timerStarted: false, timerStopped: true })
        clearInterval(this.timer);
    }

    reset = () => {
        this.setState({ timerStarted: false, timerStopped: true, hours: 0, minutes: 0, seconds: 0, user: '', event: ''})
        clearInterval(this.timer)
    }

    save = new_entry => {
        this.setState({ saved: [...this.state.saved, new_entry]})
    }
    render() {
        return (
            <div>
                <h1>{this.state.hours + ' hr ' + ': ' + this.state.minutes + ' min ' + ': ' + this.state.seconds + ' sec '}</h1>
                <div>
                    <button onClick={this.start} style={{ margin: '0 3%', height: '30px', width: '75px', fontSize: '1rem', letterSpacing: '1.8px', borderRadius: '5px', border: 'none', backgroundColor: '#28A745', color: 'white', outline: 'none', cursor: 'pointer'}}>Start</button>
                    <button onClick={this.stop} style={{ margin: '0 3%', height: '30px', width: '75px', fontSize: '1rem', letterSpacing: '1.8px', borderRadius: '5px', border: 'none', backgroundColor: '#DC3545', color: 'white', outline: 'none', cursor: 'pointer'}}>Stop</button>
                    <button onClick={this.reset} style={{ margin: '0 3%', height: '30px', width: '75px', fontSize: '1rem', letterSpacing: '1.8px', borderRadius: '5px', border: 'none', backgroundColor: '#FFC107', color: 'white', outline: 'none', cursor: 'pointer'}}>Reset</button>
                </div>
                <div style={{ marginTop: '3%'}}>
                    <div>
                        <input placeholder='Enter User' id='user' style={{ textAlign: 'center', height: '25px', width: '150px', fontSize: '1.25rem', letterSpacing: '1.8px', margin: '0 1%'}} onChange={this.changeHandler} name='user' value={this.state.user} />
                        <input placeholder='Enter Event' id='event' style={{ textAlign: 'center', height: '25px', width: '150px', fontSize: '1.25rem', letterSpacing: '1.8px', margin: '0 1%'}} onChange={this.changeHandler} name='event' value={this.state.event} />
                    </div>
                    <button onClick={() => this.save({user: this.state.user, event: this.state.event, hours: this.state.hours, minutes: this.state.minutes, seconds: this.state.seconds})} style={{ marginTop: '2%', height: '30px', width: '75px', fontSize: '1rem', letterSpacing: '1.8px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white', outline: 'none', cursor: 'pointer'}}>Save</button>
                </div>
                <div style={{ textAlign: 'left', marginLeft: '5%', marginRight: '5%'}}>
                    <h2>Time Sheet</h2>
                    <div style={{ display: 'flex', border: '1px solid black', justifyContent: 'space-between', padding: '0 2%'}}>
                        <div>
                            <h4>User</h4>
                            {this.state.saved.map(save => <h6>{save.user}</h6>)}
                        </div>
                        <div>
                            <h4>Event</h4>
                            {this.state.saved.map(save => <h6>{save.event}</h6>)}
                        </div>
                        <div>
                            <h4>Time</h4>
                            {this.state.saved.map(save => <h6>{save.hours + ' hr ' + save.minutes + ' min ' + save.seconds + ' sec '}</h6>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
