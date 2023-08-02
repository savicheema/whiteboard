import { connect } from "react-redux";
import { REDO_ACTION, SET_COLOR, SET_SHAPE, UNDO_ACTION } from "../store/consts";

const ToolPanel = ({ setShape, setColor, undo, redo }) => {
    const handleLineClicked = () => {
        setShape("line");
    }
    const handlRectangleClicked = () => {
        setShape("rect");
    }
    const handleTriangleClicked = () => {
        setShape("triangle");
    }
    const handleColorClicked = (evt) => {
        if(evt) {
            setColor(evt.target.value)
        }
        
    }
    const handleEraserClicked = () => {
        setShape("eraser");
    }
    const handleTextClicked = () => {
        setShape("text");
    }
    
    return(
        <div>
            <button onClick={ () => setShape('pencil') }>Pencil</button>
            <button onClick={ handleLineClicked }>Line</button>
            <button onClick={ handlRectangleClicked }>Rectangle</button>
            <button onClick={ handleTriangleClicked }>Triangle</button>
            {/* <button onClick={ handleColorClicked }>Color</button> */}
            <button onClick={ handleEraserClicked }>Eraser</button>
            <button onClick={ handleTextClicked }>Text</button>
            <button onClick={ () => undo() }>Undo</button>
            <button onClick={ () => redo() }>Redo</button>
            <select onChange={handleColorClicked}>
                <option style={{color: 'orange'}}>orange</option>
                <option style={{color: 'yellow'}}>yellow</option>
                <option style={{color: 'red'}}>red</option>
                <option style={{color: 'blue'}}>blue</option>
                <option style={{color: 'green'}}>green</option>
                <option style={{color: 'purple'}}>purple</option>
                <option style={{color: 'lavendar'}}>Lavender</option> 
                <option style={{color: 'black'}}>Black</option>         
            </select>
           
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    shape: state.shape
});

const mapDispatchToProps = (dispatch) => ({
    setShape: (shape) => dispatch({type: SET_SHAPE, shape}),
    undo: () => dispatch({type: UNDO_ACTION}),
    redo: () => dispatch({type: REDO_ACTION}),
    setColor: (color) => dispatch({type: SET_COLOR, color})
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel); 