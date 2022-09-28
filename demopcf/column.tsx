import * as React from 'react';
//import { IItemProps } from './Item';
import { Item, testDragItems } from './items';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";

export interface IColumnProps {
    id: string, 
    title: string, 
    itemIds: string[], 
    index?: number
}
const flexer = styled.div`
display: flex;
`;

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    padding: 8px;
`;

const ItemList = styled.div`
    padding: 8px;
`;

export default class Column extends React.Component<{ column: IColumnProps, items: testDragItems[], index: number}> {
    render() {
        return (
            <Container>
            <Title>{this.props.column.title}</Title>
            <Droppable droppableId={this.props.column.id}>
                {(provided)=>(
                <ItemList 
                ref ={provided.innerRef}
                {...provided.droppableProps}
                >
                    {this.props.column.itemIds.map((itemid, index)=>
                    {
                        const item = this.props.items.find((item)=>item.id=== itemid);
                        if(item === undefined)return;
                        return <Item key={item.id} id={item.id} content={item.content} index={index}/>
                    })}
                    {provided.placeholder}
                </ItemList>
                )}
            </Droppable>
        </Container>
        
        );
    }
}
