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
                lineWidth: 1,
                eraser: false,
                erasing: false,
                eraserX: '-5px',
                eraserY: '-5px',
                eraserVisibility: 'hidden',
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
            if (this.state.eraser) {
                /* TODO */
                if (this.state.erasing) {
                    /* TODO */
                }
            }
            else if (this.state.drawing) {
                let x = Math.floor((e.clientX-this.state.rect.left)/(this.state.rect.right-this.state.rect.left)*e.target.width),
                    y = Math.floor((e.clientY-this.state.rect.top)/(this.state.rect.bottom-this.state.rect.top)*e.target.height);
                let context = this.state.context;
                context.strokeStyle = this.state.color;
                context.lineWidth = this.state.lineWidth;
                context.lineTo(x,y);
                context.stroke();
            }
        }

        handleClick(e) {
            if (this.state.eraser) {
                this.setState({
                    erasing: true,
                })
            }
            else {
                let context = this.state.context;
                this.setState({
                    drawing: true,
                });
                let x = Math.floor((e.clientX-this.state.rect.left)/(this.state.rect.right-this.state.rect.left)*e.target.width),
                    y = Math.floor((e.clientY-this.state.rect.top)/(this.state.rect.bottom-this.state.rect.top)*e.target.height);        
                context.moveTo(x,y);
                context.beginPath();
            }
        }

        changeColor(i) {
            this.setState({
                color: this.chooseColor(i),
            });
        }

        changeWidth(i) {
            this.setState({
                lineWidth: parseInt(i.target.value,10),
            });
        }

        endDraw() {
            if (this.state.erasing) {
                this.setState({
                    erasing: false,
                })
            }
            else if (this.state.drawing) {
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

        renderInnerSquare() {
            let squareStyle = {
                background: this.state.color,
            }
            return <div style={squareStyle} className="innerSquare"/>;
        }

        handleEraser() {
            this.setState({
                eraser: !this.state.eraser,
            });
        }

        renderEraserMenu() {
            let eraserStyle = {};
            if (this.state.eraser) {
                eraserStyle = {
                    background: 'red',
                    color: 'white',
                }
            }
            else {
                eraserStyle = {
                    background: 'white',
                    color: 'black',
                }
            }
            return (<div className='eraser'>
                    <p className='eraserText'>Eraser:</p>
                    <div className='eraserTool'>
                        <div className='eraserInnerSquare' style={eraserStyle} onClick={()=>this.handleEraser()}>
                            <p className='eraserE'>E</p>
                        </div>
                    </div>
                    </div>);
        }

        render() {
            return <div className="area"><Stin/><Platno
                id="canvas1"
                onMouseDown={(e) => this.handleClick(e)}
                onMouseMove={(e) => this.handleMove(e)}
                onMouseOut={() => this.endDraw()}
                onMouseUp={() => this.endDraw()}>
                </Platno>
                <Menu>
                    <Newbtn onClick={() => this.newPic()} />
                {this.renderEraserMenu()}
                <div className="style">
                    <p className='styleText'>Line width:</p>
                    <select className='styleTool' onChange={(value)=>this.changeWidth(value)}>
                        <option value='1'>1 px</option>
                        <option value='3'>3 px</option>
                        <option value='5'>5 px</option>
                    </select>
                </div>
                <div className="colors">
                               <p className="colorText">Color:</p>
                                <div className="outerSquare">
                                    {this.renderInnerSquare()}
                                </div>
                                <div className="palette">           
                                    {this.renderClrBtn(0)}
                                    {this.renderClrBtn(1)}
                                    {this.renderClrBtn(2)}
                                    {this.renderClrBtn(3)}
                                    {this.renderClrBtn(4)}
                                    <br/>
                                    {this.renderClrBtn(5)}
                                    {this.renderClrBtn(6)}
                                    {this.renderClrBtn(7)}
                                    {this.renderClrBtn(8)}
                                    {this.renderClrBtn(9)}
                                </div>
                </div>
                </Menu>
                </div>;
        }
    }

export default Crayons;
