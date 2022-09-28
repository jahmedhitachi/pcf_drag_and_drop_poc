import * as React from "react";
import { useState } from 'react';
import { DragDropContext, DropResult, Droppable, DraggableLocation } from "react-beautiful-dnd";
import { render } from "react-dom";
import styled from "styled-components";
import Column, { IColumnProps } from "./column";
import { Item, testDragItems } from "./items";

export interface testDragProps
{
    items: testDragItems[],
    columns: IColumnProps[],
    columnOrder: string[]

}


const Container= styled.div`
    display: flex;
`;


// export interface testDragColumns
// {
//     id: string,
//     content: string,
//     itemIds: string[]
// }


export class poc extends React.Component<testDragProps>
{
    //state = this.props;
    
    onDragEnd = (result: DropResult) =>
    {
        //todo
        const {destination, source,draggableId} = result;

        if (!destination){
            return;
        }

        if(destination.droppableId === source.droppableId && 
            destination.index === source.index)
        {
            return;
        }


        
        let newCols = this.props.columns;
        
        const column = this.props.columns.find((col: {id: string;})=>col.id === source.droppableId);
        console.log(result);
        console.log(column);
        if(column === undefined) {return;}
        //handle rows in column
        const newItemIds = Array.from(column.itemIds);
        newItemIds.splice(source.index, 1);
        newItemIds.splice(destination.index, 0, draggableId);

        const sourceColumn:IColumnProps = {
            ...column,
            itemIds: newItemIds,
        };

        //let col = this.props.columns;
        newCols.splice(source.index,1);
        newCols.splice(source.index,0,sourceColumn);// (where, what to remove, replace with what)

        const newState = {
            ...this.props,
            columns: {
                ...this.props.columns,
                [sourceColumn.id]: sourceColumn,
            },
        };
        //this.setState({...this.state, columns: col });
        this.setState(newState);
    }
    
    render() {
        
        return(
            
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
            {this.props.columnOrder.map((columnId,index) => {
            const column = this.props.columns.find((col) => col.id === columnId);
            if (column === undefined) return;
            return <Column key={column.id} column={column} items={this.props.items} index={index} />
        })}</Container>
        </DragDropContext>
            
        );
    }
}