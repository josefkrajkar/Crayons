// @flow
import React, { Component } from 'react';
import './crayons.css';

//functional component for canvas
function Platno(props) {
    return <canvas onMouseDown={props.onMouseDown}
        onMouseMove={props.onMouseMove}
        onMouseOut={props.onMouseOut}
        onMouseUp={props.onMouseUp}
        className="platno"
        id={props.id}
        style={props.style} />;
}

//functional component for the eraser cursor
function Erasertool(props) {
    let stats = {
        top: props.y,
        left: props.x,
        visibility: props.visibility,
    };
    return <div className='eraserTool' draggable='false' style={stats} />;
}

//functional component for the shadow behind a canvas
function Stin() {
    return <div className="shadow" />;
}

//functional component for the "New" button
function Newbtn(props) {
    return <button className='newButton' type="button" onClick={props.onClick}><b>New</b></button>
}

//functional component for the Menu at the bottom of the screen
function Menu(props) {
    return <div className="menu">{props.children}</div>;
}

//Main class responsible for the correct beheaviour of the Crayons component
class Crayons extends Component {

    //flow state declaration
    state: {
        drawing: boolean,
        color: string,
        lineWidth: number,
        eraser: boolean,
        erasing: boolean,
        eraserX: string,
        eraserY: string,
        eraserVisibility: string,
        context: {
            stroke: Function,
            strokeStyle: string,
            clearRect: Function,
            beginPath: Function,
            moveTo: Function,
            lineTo: Function,
            lineWidth: number
        },
        canvas: {
            height: number,
            width: number,
        },
        rect: {
            top: number,
            bottom: number,
            left: number,
            right: number,
        },
        cursorStyle: {
            cursor: string,
        }
    }
    squareStyle: {
        background: string,
    }
    eraserStyle: {
        background: string,
        color: string
    }
    stats: {
        top: number,
        left: number,
        visibility: string
    }

    //constructor method with "declaration" of the state property
    constructor() {
        super();
        this.state = {
            context: {
                strokeStyle: '',
                lineWidth: 1,
                stroke: Function,
                moveTo: Function,
                lineTo: Function,
                clearRect: Function,
                beginPath: Function,
            },
            canvas: {
                height: 0,
                width: 0,
            },
            rect: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            cursorStyle: {
                cursor: 'crosshair',
            },
            drawing: false,
            color: 'black',
            lineWidth: 1,
            eraser: false,
            erasing: false,
            eraserX: '5px',
            eraserY: '5px',
            eraserVisibility: 'hidden',
            }
    }

    //when component mounts, the canvas and context properties are set to the state 
    componentDidMount() {
        let canvas_handler: ?Object = document.getElementById('canvas1');
        if (canvas_handler != null) {
            this.setState({
                canvas: canvas_handler,
                context: canvas_handler.getContext('2d'),
                rect: canvas_handler.getBoundingClientRect(),
            });
        }
    }

    //method for handling the mouse move over the canvas
    handleMove(e: MouseEvent) {
        if (this.state.eraser) {
            this.setState({
                eraserX: e.clientX + '',
                eraserY: e.clientY + '',
                eraserVisibility: 'visible',
            })
            if (this.state.erasing) {
                let x: number = Math.floor((e.clientX - this.state.rect.left) / (this.state.rect.right - this.state.rect.left) * this.state.canvas.width),
                    y: number = Math.floor((e.clientY - this.state.rect.top) / (this.state.rect.bottom - this.state.rect.top) * this.state.canvas.height);
                let context: {clearRect: Function} = this.state.context;
                context.clearRect(x + 1, y + 1, 12, 9);
            }
        }
        else if (this.state.drawing) {
            let x: number = Math.floor((e.clientX - this.state.rect.left) / (this.state.rect.right - this.state.rect.left) * this.state.canvas.width),
                y: number = Math.floor((e.clientY - this.state.rect.top) / (this.state.rect.bottom - this.state.rect.top) * this.state.canvas.height);
            let context: {stroke: Function, lineTo: Function, lineWidth: number, strokeStyle: string} = this.state.context;
            context.strokeStyle = this.state.color;
            context.lineWidth = this.state.lineWidth;
            context.lineTo(x, y);
            context.stroke();
        }
    }

    //method for handling the mouse down event on the canvas
    handleClick(e: MouseEvent) {
        if (this.state.eraser) {
            this.setState({
                erasing: true,
            });
            let x: number = Math.floor((e.clientX - this.state.rect.left) / (this.state.rect.right - this.state.rect.left) * this.state.canvas.width),
                y: number = Math.floor((e.clientY - this.state.rect.top) / (this.state.rect.bottom - this.state.rect.top) * this.state.canvas.height);
            let context = this.state.context;
            context.clearRect(x + 1, y + 1, 12, 8);
        }
        else {
            let context = this.state.context;
            this.setState({
                drawing: true,
            });
            let x: number = Math.floor((e.clientX - this.state.rect.left) / (this.state.rect.right - this.state.rect.left) * this.state.canvas.width),
                y: number = Math.floor((e.clientY - this.state.rect.top) / (this.state.rect.bottom - this.state.rect.top) * this.state.canvas.height);
            context.moveTo(x, y);
            context.beginPath();
        }
    }

    //method for changing the color of a line
    changeColor(i: number) {
        this.setState({
            color: this.chooseColor(i),
        });
    }

    //method for changing the width of a line
    changeWidth(i: {target: {value: string}}) {
        this.setState({
            lineWidth: parseInt(i.target.value, 10),
        });
    }

    //method called when the mouse button is released over the canvas
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

    //method called when the cursor leaves the canvas area
    outOfCanvas() {
        if (this.state.eraser) {
            this.setState({
                erasing: false,
                eraserVisibility: 'hidden',
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

    //method called when the "New" button is clicked - after confirmation will clear the canvas
    newPic() {
        if (confirm("Clear the canvas?") === true) {
            let context = this.state.context;
            context.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
        }
    }

    //method used by component for choosing proper color from the array of colors
    chooseColor(i: number) {
        const colors = ['black', 'white', 'grey', 'blue', 'green', 'red', 'brown', 'yellow', 'orange', 'purple'];
        return colors[i];
    }

    //method for rendering the "color" button
    renderClrBtn(i: number) {
        let btnStyle = {
            background: this.chooseColor(i),
        };
        return <button type='button' className='clrbtn' onClick={() => this.changeColor(i)} style={btnStyle} />
    }

    //method rendering square with the chosen color
    renderInnerSquare() {
        let squareStyle = {
            background: this.state.color,
        }
        return <div style={squareStyle} className="innerSquare" />;
    }

    //method called when the "Eraser" button is clicked - handles turning the eraser on and off
    handleEraser() {
        this.setState({
            eraser: !this.state.eraser,
            cursorStyle: {
                cursor: (this.state.eraser ? 'crosshair' : 'none'),
            }
        });

    }

    //method rendering the eraser part of the menu 
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
            <div className='eraserButton'>
                <div className='eraserInnerSquare' style={eraserStyle} onClick={() => this.handleEraser()}>
                    <p className='eraserE'>E</p>
                </div>
            </div>
        </div>);
    }

    //main method rendering the Crayons component
    render() {
        return <div className="area"><Stin /><Platno
            id="canvas1" style={this.state.cursorStyle}
            onMouseDown={(e) => this.handleClick(e)}
            onMouseMove={(e) => this.handleMove(e)}
            onMouseOut={() => this.outOfCanvas()}
            onMouseUp={() => this.endDraw()}>
        </Platno>
            <Erasertool x={this.state.eraserX} y={this.state.eraserY} visibility={this.state.eraserVisibility} />
            <Menu>
                <div className='newMenu'>
                    <p className='newText'>
                        New canvas:
                    </p>
                    <Newbtn onClick={() => this.newPic()} />
                </div>
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
                        <br />
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
