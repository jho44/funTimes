import React from 'react';
import { connect } from 'react-redux';
import { addItem, deleteItem } from './redux/actions';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ""
        }
    }

    addItem(input) {
        if (input === "") {
            window.alert("Can't wish for nothing")
            return
        }
        const list = this.props.storeVal.wishList === undefined ? [] : this.props.storeVal.wishList
        if (list.filter(x => x === input).length > 0) {
            window.alert("You've already added this to your list :)")
            this.setState({ input: "" })
            return
        }
        this.setState({ input: "" })
        this.props.addItem(input)
    }

    handleSubmit() {
        const list = this.props.storeVal.wishList
        if (list.length === 0) {
            window.alert("Can't submit an empty wishlist :(")
            return
        }
        window.alert("Wish list submitted to Santa!")

        for (var i = 0; i < list.length; i++) {
            this.props.deleteItem(list[i])
        }
    }

    render() {
        const { input } = this.state
        const listItems = this.props.storeVal.wishList === undefined ? [] : this.props.storeVal.wishList
        return (
            <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "#D0D1D0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: 5, backgroundColor: "#FCC0CB", width: 400, height: 540, boxShadow: "0px 3px 5px black, 0px -3px 5px black, 3px 0px 5px black, -3px 0px 5px black" }}>
                    <h3 style={{ paddingTop: 15, paddingBottom: 10 }}>MY WISHLIST</h3>
                    <div className="list" style={{ height: 250, width: 300, backgroundColor: "white", borderStyle: "solid", borderWidth: 1 }}>
                        <ul style={{ padding: 0, paddingLeft: 20 }}>
                            {listItems.map((item, idx) => {
                                return (
                                    <li onClick={() => this.props.deleteItem(item)}
                                        style={{ listStyleType: "none", cursor: "pointer", paddingBottom: 10 }}
                                        key={idx}
                                    >
                                        {item}
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    <form style={{ paddingTop: 20 }}>
                        <input onChange={(e) => this.setState({ input: e.target.value })}
                            style={{ height: 40, width: 300, borderStyle: "solid", borderRadius: 5, fontSize: 20 }}
                            value={input}></input>
                    </form>
                    <StyledButton style={{ paddingLeft: 40, paddingRight: 40 }} onClick={() => this.addItem(input)}>Add</StyledButton>
                    <StyledButton style={{ paddingLeft: 90, paddingRight: 90 }} onClick={() => this.handleSubmit()}>Submit</StyledButton>
                </div>
            </div>
        )
    }
}

const StyledButton = styled(Button)({
    backgroundColor: "#90EB91",
    marginTop: 19,
    fontWeight: "bold",
    paddingTop: 8,
    paddingBottom: 8,
    boxShadow: "2px 3px 4px #C2B8A9"
})


const mapStateToProps = (state) => {
    return {
        storeVal: state,
    }
}

const mapDispatchToProps = { addItem, deleteItem }

export default connect(mapStateToProps, mapDispatchToProps)(App)