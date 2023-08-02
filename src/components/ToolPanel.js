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
    const handleColorClicked = () => {
        setColor("#FF0000")
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
            <button onClick={ handleColorClicked }>Color</button>
            <button onClick={ handleEraserClicked }>Eraser</button>
            <button onClick={ handleTextClicked }>Text</button>
            <button onClick={ () => undo() }>Undo</button>
            <button onClick={ () => redo() }>Redo</button>
            
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