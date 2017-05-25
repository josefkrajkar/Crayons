import React, { Component } from 'react';
import './crayons.css';

    class Crayons extends Component {
        constructor() {
            super();
            this.state= {
                picture: ['Paper: ','Rock','Shotgun'],
                text: 'Kapr',
                drawing: false,
            }
        }

        handleMove(e) {
            if (this.state.drawing) {
                this.setState({
                    text: (e.clientX - 40) + ',' + (e.clientY - 18),
                })
            }
        }

        handleClick(e) {
            this.setState({
                drawing: true,
            })
            /*
            this.state.picture.push(e.clientX);
            this.state.picture.push(e.clientY);
            this.forceUpdate();
           */
        }

        endDraw() {
            this.setState({
                drawing: false,
            })
        }

        render() {
            return <div className="area"><Stin/><Ctvrtka
                onMouseDown={(e) => this.handleClick(e)}
                onMouseMove={(e) => this.handleMove(e)}
                onMouseOut={() => this.endDraw()}
                onMouseUp={() => this.endDraw()}>
                {this.state.text}
                </Ctvrtka>
                <Menu>Tools and colors</Menu>
                </div>; //{this.state.picture.map(function(item){return <div>{item}</div>})}
        }
    }

    function Stin() {
            return <div className="shadow"/>;
    }

    function Ctvrtka(props) {
            return <div onMouseDown={props.onMouseDown}
                        onMouseMove={props.onMouseMove}
                        onMouseOut={props.onMouseOut}
                        onMouseUp={props.onMouseUp}
                        className="paper">{props.children}</div>;
    }

    function Menu(props) {
            return <div className="menu">{props.children}</div>;
    }

export default Crayons;
