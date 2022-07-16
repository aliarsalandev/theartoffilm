import React from "react";
import CoverFlow from "coverflow-react";
import "./css/coverflow.css";

class CoverFlowComponent extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
  constructor(props) {
    super(props);
    this.passPropCheckbox = this.passPropCheckbox.bind(this);
    this.inputRow = this.inputRow.bind(this);
    this.itemRatio = this.itemRatio.bind(this);
    this.state = {
      width: document.body.offsetWidth,
      passWidth: true,
      height: 250,
      passHeight: true,
      itemRatio: {
        x: 8,
        y: 5,
      },
      passItemRatio: true,
      background: "#333333",
      passBackground: true,
      passLabels: true,
      direction: "horizontal",
    };
    window.addEventListener("resize", () => {
      this.setState((prevState) => {
        if (prevState.direction === "vertical") {
          return {
            height: document.body.offsetHeight,
          };
        }
        return {
          width: document.body.offsetWidth,
        };
      });
    });
  }
  render() {
    let demoStyle = {};
    if (this.state.direction === "vertical") {
      demoStyle["flexDirection"] = "row";
    } else {
      demoStyle["flexDirection"] = "column";
    }
    return (
      <div className="cover-flow" style={demoStyle}>
        <CoverFlow {...this.props} />
      </div>
    );
  }
  passPropCheckbox(propName) {
    return (
      <input
        type="checkbox"
        checked={this.state[propName]}
        onChange={(e) => {
          this.setState((prevState, props) => {
            let newState = {};
            newState[propName] = !prevState[propName];
            return newState;
          });
        }}
      />
    );
  }
  inputRow(name, type) {
    let passName = "pass" + name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div>
        {this.passPropCheckbox(passName)}
        <label>Container {name}:</label>
        <input
          placeholder={name}
          type={type}
          min="1"
          value={this.state[name]}
          onChange={(e) => {
            let newState = {};
            newState[name] =
              type === "number" ? parseInt(e.target.value) : e.target.value;
            this.setState(newState);
          }}
          disabled={!this.state[passName]}
        />
      </div>
    );
  }
  itemRatio() {
    const axisInput = (axis) => {
      return (
        <input
          placeholder={axis}
          type="number"
          min="1"
          style={{ width: "60px" }}
          value={this.state.itemRatio[axis]}
          onChange={(e) => {
            let newState = {
              itemRatio: {},
            };
            newState.itemRatio[axis] = parseInt(e.target.value);
            let otherAxis = axis === "x" ? "y" : "x";
            newState.itemRatio[otherAxis] = this.state.itemRatio[otherAxis];
            this.setState(newState);
          }}
          disabled={!this.state.passItemRatio}
        />
      );
    };
    return (
      <div>
        {this.passPropCheckbox("passItemRatio")}
        <label>Item Ratio:</label>
        {axisInput("x")}
        {axisInput("y")}
      </div>
    );
  }
}

export default CoverFlowComponent;
