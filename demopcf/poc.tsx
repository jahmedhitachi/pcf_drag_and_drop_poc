import * as React from "react";
import { useState } from 'react';
import { DragDropContext, DropResult, Droppable, DraggableLocation } from "react-beautiful-dnd";
import { render } from "react-dom";
import styled from "styled-components";
import Column, { IColumnProps } from "./column";
import { Item, testDragItems } from "./items";

export interface testDragProps {
    items: testDragItems[],
    columns: IColumnProps[],
    columnOrder: string[]
}

interface column {
    id: string,
    title: string,
    itemIds: string[],
}


const Container = styled.div`
    display: flex;
`;


// export interface testDragColumns
// {
//     id: string,
//     content: string,
//     itemIds: string[]
// }


export class poc extends React.Component<testDragProps> {
    constructor(props){
        super(props);
	this.state = {...this.props};
    }
    
    onDragEnd = (result: DropResult) => {
        /* 
	 * Use result from drag
	 * - destination: object containing information on where the drag was placed 
	 * - source: object containing information on where the drag orignated from
	 * - draggableId: object containing information about the item that has been dragged
	 */ 
        const {destination, source, draggableId} = result;

	// Dragged to an undraggable location - do nothing
        if (!destination) return;

	// Dragged to the same location - do nothing
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;


	// Get the current state of all the columns prior to the drag
        // OLD: let newCols = this.props.columns;
        const currColumns = this.state.columns;
        
	// Get the current column - may change where this lives in the future
	// Change column - may change where this lives in the future
        const column = currColumns.find( (col: column) => col.id === source.droppableId);

	console.log("Result from drag:")
        console.log(result);
	console.log("This is the current columns data:")
	console.log(currColumns)

        if (column === undefined) return;

        // Handle new item order after drag with a new ItemIds array
        const newRows = column.itemIds.slice();

	// delete the item from it's original position
        newRows.splice(source.index, 1);

	// Add the item to it's new position
        newRows.splice(destination.index, 0, draggableId);

        const newColumn :IColumnProps = {
            ...column,
            itemIds: newRows,
        };

	const newColumns = currColumns.map( (col: column) => {
	    if(col.id === source.droppableId){
	        return newColumn;
	    } else {
	        return col;
	    }
	});

	console.log("New Columns Data")
	console.log(newColumns)

        // newCols.splice(source.index,1);
        // newCols.splice(source.index,0,sourceColumn);// (where, what to remove, replace with what)

        // Set the state with the new columns data.
        this.setState({
            columns: newColumns,
        });
    }
    
    render(){
	console.log("This is the current state:")
	console.log(this.state)
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
		    {this.state.columns.map((column, index) => {
			return <Column key={column.id} column={column} items={this.state.items} index={index} />
                    })}
		</Container>
            </DragDropContext>
        );
    }
}
