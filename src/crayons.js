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

    function Newbtn(props) {
      return <button className="newbtn" type="button" onClick={props.onClick}>New</button>
    }

    function Menu(props) {
        return <div className="menu">{props.children}</div>;
    }

    class Crayons extends Component {
        constructor() {
            super();
            this.state= {
                drawing: false,
                context: {},
                rect: {},
                canvas: {},
                color: 'black',
            }
        }

        componentDidMount() {
            let canvas = document.getElementById("canvas1");
            if (this.state.canvas != null) {
                this.setState({
                    canvas: canvas,
                    context: canvas.getContext('2d'),
                    rect: canvas.getBoundingClientRect(),
                });
            }
        }

        handleMove(e) {
            if (this.state.drawing) {
                let x = Math.floor((e.clientX-this.state.rect.left)/(this.state.rect.right-this.state.rect.left)*e.target.width),
                    y = Math.floor((e.clientY-this.state.rect.top)/(this.state.rect.bottom-this.state.rect.top)*e.target.height);
                let context = this.state.context;
                context.strokeStyle = this.state.color;
                //context.lineWidth = 3.0;
                context.lineTo(x,y);
                context.stroke();
            }
        }

        handleClick(e) {
            let context = this.state.context;
            this.setState({
                drawing: true,
            });
            let x = Math.floor((e.clientX-this.state.rect.left)/(this.state.rect.right-this.state.rect.left)*e.target.width),
                y = Math.floor((e.clientY-this.state.rect.top)/(this.state.rect.bottom-this.state.rect.top)*e.target.height);        
            context.moveTo(x,y);
            context.beginPath();
        }

        changeColor(i) {
            this.setState({
                color: this.chooseColor(i),
            });
        }

        endDraw() {
            if (this.state.drawing) {
                let context = this.state.context;
                this.setState({
                    drawing: false,
                });
                context.stroke();
            }
        }

        newPic() {
            let context = this.state.context;
            context.clearRect(0,0,this.state.canvas.width,this.state.canvas.height);
            
        }

        chooseColor(i) {
            const colors = ['black','white','grey','blue','green','red','brown','yellow','orange','purple'];
            return colors[i];
        }

        renderClrBtn(i) {
            let btnStyle = {
                background: this.chooseColor(i),
            };
            return <button type='button' className='clrbtn' onClick={() => this.changeColor(i)} style={btnStyle}/>
        }

        render() {
            return <div className="area"><Stin/><Platno
                id="canvas1"
                onMouseDown={(e) => this.handleClick(e)}
                onMouseMove={(e) => this.handleMove(e)}
                onMouseOut={() => this.endDraw()}
                onMouseUp={() => this.endDraw()}>
                {this.state.text}
                </Platno>
                <Menu>
                    Tools and colors<br/>
                    <Newbtn onClick={() => this.newPic()} /><br/>           
                {this.renderClrBtn(0)}
                {this.renderClrBtn(1)}
                {this.renderClrBtn(2)}
                {this.renderClrBtn(3)}
                {this.renderClrBtn(4)}
                {this.renderClrBtn(5)}
                {this.renderClrBtn(6)}
                {this.renderClrBtn(7)}
                {this.renderClrBtn(8)}
                {this.renderClrBtn(9)}
                </Menu>
                </div>;
        }
    }


export default Crayons;
