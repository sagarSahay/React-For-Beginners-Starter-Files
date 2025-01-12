import React from "react";
import Header from "./Header"
import Inventory from "./Inventory"
import Order from "./Order"
import sampleFishes from "../sample-fishes"
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {

        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    };

    removeFromOrder = key => {
        const order = {...this.state.order};
        order[key] = 0;
        delete  order[key];
        this.setState({order});
    }

    deleteFish = key => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh daily"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key =>
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}

                            />)
                        }

                    </ul>
                </div>
                {<Order fishes={this.state.fishes}
                        removeFromOrder={this.removeFromOrder}
                        order={this.state.order}/>}
                {<Inventory addFish={this.addFish}
                            loadSampleFishes={this.loadSampleFishes}
                            fishes={this.state.fishes}
                            updateFish={this.updateFish}
                            deleteFish={this.deleteFish}/>}
            </div>
        );
    }

}

export default App;