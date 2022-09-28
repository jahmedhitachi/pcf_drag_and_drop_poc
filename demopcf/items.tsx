import * as React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";

export interface testDragItems
{
    id: string,
    content: string,
    index?: number
}

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;

    display: flex;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: green;
    margin-right: 8px
`;

export class Item extends React.Component<testDragItems>
{
    render() {
        return (<Draggable draggableId={this.props.id} index={this.props.index!}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {this.props.content}
                </Container>)
            }
        </Draggable>
        );
    }
}