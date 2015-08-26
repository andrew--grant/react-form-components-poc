import React from 'react';

class SimplePubSub {

    constructor() {
        this.subscribers = [];
    }

    publish(eventName, evt) {
        var self = this;
        if (eventName == "quantity-changed") {
            this.subscribers.map(function (obj) {
                obj.func(evt.quantity);
            });
        }
    }

    on(eventName, func) {
        this.subscribers.push({eventName: eventName, func: func});
    }
}

var pubSub = new SimplePubSub();

class AGForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                {this.props.children}
                <AGButton>Submit</AGButton>
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
            <div className="form-group">
                <label forName={this.props.name}>{this.props.labelText}</label>
                <input className="form-control" name={this.props.name} type="text"
                       placeholder={this.props.placeholder}></input>
            </div>
        );
    }
}

class AGSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(e) {
        pubSub.publish("quantity-changed", {quantity: e.target.selectedIndex});
    }

    render() {
        return (
            <div>
                <select className="form-control" name={this.props.name} onChange={this.handleChange.bind(this)}>
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

class AGButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-default" onClick={this.props.clickHandler}>{this.props.children}</button>
        );
    }
}

class AGDyanmicTextFields extends React.Component {

    constructor(props) {
        super(props);
        this.props.quantityToAdd = 0;
        this.state = {
            quantity: this.props.quantity,
            prefix: this.props.prefix
        };
    }

    componentDidMount() {
        var self = this;
        pubSub.on("quantity-changed", function (quantity) {
            self.props.quantityToAdd = quantity;
        });
    }

    addFields(e) {
        e.preventDefault();
        this.doQuantityChanged()
    }

    removeField(e) {
        e.preventDefault();
        if (this.state.quantity > 1) {
            this.doRemove(1);
        }
    }

    doQuantityChanged(qty) {
        this.setState({quantity: parseInt(this.state.quantity) + parseInt(this.props.quantityToAdd)});
    }

    doRemove(qty) {
        this.setState({quantity: parseInt(this.state.quantity) - qty});
    }

    render() {
        var fields = [];
        for (var i = 0; i < this.state.quantity; i++) {
            fields.push(<AGInput labelText={'Product ' + (i + 1)} name={this.state.prefix + i} key={i}/>);
        }
        return (
            <div class="container">
                <div className="row">
                    <div className="col-md-3">
                        <AGSelect>
                            <AGSelectOptions>Quantity</AGSelectOptions>
                            <AGSelectOptions>1</AGSelectOptions>
                            <AGSelectOptions>2</AGSelectOptions>
                            <AGSelectOptions>3</AGSelectOptions>
                            <AGSelectOptions>4</AGSelectOptions>
                        </AGSelect>
                    </div>
                    <div className="col-md-2">
                        <AGButton clickHandler={this.addFields.bind(this)}>Add</AGButton> <AGButton
                        clickHandler={this.removeField.bind(this)}>Remove</AGButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5" name={this.props.name}>
                        { fields }
                    </div>
                </div>
            </div>
        );
    }
}

React.render(
    <AGForm>
        <div class="container">
            <div class="row">
                <div class="col-sm12">
                    <h1>React Demo</h1>

                    <p>A sample React form demonstrating adding and removing inputs.</p>

                    <p>This also demonstrates communication between components with no parent-child or child-parent
                        relationship.</p>
                </div>
            </div>
        </div>
        <AGDyanmicTextFields quantity="2" prefix="registration-number"/>
    </AGForm>, document.querySelector("#myApp")
);