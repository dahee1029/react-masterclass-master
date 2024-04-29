import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import React from 'react';
import { useRecoilState } from 'recoil';
import { ITodo, ITodoState, todoState } from '../atom';

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 3px;
  font-size: 10px;
  background-color: ${(props) =>
    props.isDragging ? '#ffeaa7' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '2px 0px 5px rgba(0,0,0,0.5)' : 'none'};
`;

const ModifyBtn = styled.button`
  padding: 0px 2px;
  background-color: transparent;
  border-style: none;
  font-size: 100%;
`;

const DeleteBtn = styled.button`
  padding: 0px 2px;
  background-color: transparent;
  border-style: none;
  font-size: 100%;
`;

const Buttons = styled.div`
  display: flex;
`;

interface IDragabbleCardProps {
  todoId: number;
  todoText: string;
  index: number;
}
const DraggableCard = ({ todoId, todoText, index }: IDragabbleCardProps) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const handleModify = (event: React.MouseEvent<HTMLButtonElement>) => {};
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    //draggableId가 string이어야 하기 때문에 ""를 붙여서 type을 string으로 바꿔준다
    <Draggable draggableId={todoId + ''} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todoText}
          <Buttons>
            <ModifyBtn onClick={handleModify}>🖊</ModifyBtn>
            <DeleteBtn onClick={handleDelete}>🗑</DeleteBtn>
          </Buttons>
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DraggableCard);
