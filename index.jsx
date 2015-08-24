import React from 'react';

class EventSys {

    constructor() {
        this.addSubscribers = [];
        this.removeSubscribers = []; // unused
    }

    publish(eventName, evt) {
        var self = this;
        if(eventName == "add"){
            this.addSubscribers.map(function (obj) {
                obj.func(evt.quantity);
            });
        }
    }

    on(eventName, func) {
        this.addSubscribers.push({eventName: eventName, func: func});
    }
}

var eventSys = new EventSys();

class Form extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                {this.props.children}
                <button type="submit">Submit</button>
            </form>
        );
    }
}

class AGInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input className="aginput" name={this.props.name} type="text" placeholder={this.props.placeholder}></input>
        );
    }
}

class AGSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(e) {
        eventSys.publish("add", {quantity:e.target.selectedIndex});
    }

    render() {
        return (
            <div onChange={this.handleClick}>
                <select className="agselect" name={this.props.name} onChange={this.handleChange.bind(this)}>
                    {this.props.children}
                </select>
            </div>
        );
    }
}

class AGSelectOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <option name={this.props.name} selected={this.props.selected}>
                {this.props.children}
            </option>

        );
    }
}

class AGDyanmicTextFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity,
            prefix: this.props.prefix
        };
    }

    componentDidMount() {
        var self = this;
        eventSys.on("add", function (quantity) {
            self.doAdd(quantity);
        });
    }

    addField(e) {
        console.log("e");
        console.log(e);
        e.preventDefault();
        this.doAdd(1)
    }

    removeField(e) {
        e.preventDefault();
        if (this.state.quantity > 1) {
            this.doRemove(1);
        }
    }

    doAdd(qty) {
        this.setState({quantity: parseInt(this.state.quantity) + qty})
    }


    doRemove(qty) {
        this.setState({quantity: parseInt(this.state.quantity) - qty})
    }

    render() {
        var fields = [];
        for (var i = 0; i < this.state.quantity; i++) {
            fields.push(<AGInput name={this.state.prefix + i} key={i}/>);
        }
        return (
            <div>
                <div>
                    <button onClick={this.addField.bind(this)}>Add</button>
                    <button onClick={this.removeField.bind(this)}>Remove</button>
                </div>
                <div name={this.props.name}>
                    { fields }
                </div>
            </div>
        );
    }
}

React.render(
    <Form>
        <AGInput name="FirstName"/>
        <AGInput name="Surname"/>
        <AGSelect>
            <AGSelectOptions>Number of Fields to Add</AGSelectOptions>
            <AGSelectOptions>1</AGSelectOptions>
            <AGSelectOptions>2</AGSelectOptions>
            <AGSelectOptions>3</AGSelectOptions>
        </AGSelect>
        <AGDyanmicTextFields quantity="2" prefix="regonum"/>
    </Form>, document.querySelector("#myApp")
);

