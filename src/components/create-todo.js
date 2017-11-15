import React from 'react';
import _ from 'lodash';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <p style={{ 
            color: 'red', 
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: 135
        }}>{this.state.error}</p>;
    }

    render() {
        return (
            <div>
                {this.renderError()}
                <form onSubmit={this.handleCreate.bind(this)}>
                    <input type="text" placeholder="What do I need to do?" ref="createInput" className="form-control" />
                    <button>Create</button>
                </form>
            </div>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }
}
