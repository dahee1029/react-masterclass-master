import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { todoState } from './atom';
import { useRecoilState } from 'recoil';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  min-width: 600px;
  width: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Boards = styled.div`
  display: grid;
  width: 90%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const Bin = styled.div`
  width: 100%;
  height: 50px;
  text-align: end;
  padding-right: 20px;
  margin-bottom: 20px;
  font-size: 50px;
`;
function APP() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setTodos((allBoards) => {
      //source의 droppableId로 부터 array를 복사하는 과정
      const copyTodos = [...allBoards[source.droppableId]];
      const taskObj = copyTodos[source.index];
      copyTodos.splice(source.index, 1);
      copyTodos.splice(destination?.index, 0, taskObj);
      return {
        ...allBoards,
        [source.droppableId]: copyTodos,
      };
    });
    if (destination?.droppableId !== source.droppableId) {
      //cross board movement
      setTodos((allBoards) => {
        //source의 droppableId로 부터 array를 복사하는 과정
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
      <Bin>🗑</Bin>
    </DragDropContext>
  );
}

export default APP;
