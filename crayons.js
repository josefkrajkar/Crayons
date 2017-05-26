import React, { Component } from 'react';
import './crayons.css';


    function Platno(props) {
        return <canvas onMouseDown={props.onMouseDown}
                   onMouseMove={props.onMouseMove}
                   onMouseOut={props.onMouseOut}
                   onMouseUp={props.onMouseUp}
                   className="platno"
                   id="canvas1"/>;
    }

    function Stin() {
        return <div className="shadow"/>;
    }

    function Clr_Btn(props) {
      return <button type="button" onClick={props.onClick}>New</button>
    }

    function Menu(props) {
        return <div className="menu">{props.children}</div>;
    }

    class Crayons extends Component {
        constructor() {
            super();
            this.state= {
                drawing: false,
            }
        }

        handleMove(e) {
            if (this.state.drawing) {
             let rect = e.target.getBoundingClientRect();
             let ctx = e.target.getContext('2d');
             let x = Math.floor((e.clientX-rect.left)/(rect.right-rect.left)*e.target.width);
             let y = Math.floor((e.clientY-rect.top)/(rect.bottom-rect.top)*e.target.height);
             ctx.fillRect(x,y,1,1);
              //  ctx.fillRect(x,y,rect.width,rect.height);
            }
        }

        handleClick(e) {
            this.setState({
                drawing: true,
            })
        }

        endDraw() {
            this.setState({
                drawing: false,
            })
        }

        newPic() {
            /*
            let canvas = document.getElementById('canvas1');
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width,canvas.height);
            */
        }

        render() {
            return <div className="area"><Stin/><Platno
                onMouseDown={(e) => this.handleClick(e)}
                onMouseMove={(e) => this.handleMove(e)}
                onMouseOut={() => this.endDraw()}
                onMouseUp={() => this.endDraw()}>
                {this.state.text}
                </Platno>
                <Menu>
                    Tools and colors<br/>
                    <Clr_Btn onClick={() => this.newPic()}/>
                </Menu>
                </div>;
        }
    }


export default Crayons;
