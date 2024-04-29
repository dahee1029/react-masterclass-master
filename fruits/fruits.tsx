import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Title = styled.h2`
  font-size: 32px;
  padding: 60px;
  text-align: center;
`;

const FruitBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Containers = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;
const Box = styled.div`
  width: 100%;
  height: 90%;
`;

const Form = styled.form`
  text-align: center;
`;

const Item = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

function Fruits() {
  const { register, handleSubmit, reset } = useForm();
  const fruits = [
    "딸기",
    "포도",
    "복숭아",
    "사과",
    "샤인머스켓",
    "귤",
    "감",
    "배",
    "수박",
    "낑깡",
  ];

  const [fruitBox, setFruitBox] = useState(fruits);

  const deleteFruit = (fruitToDelete: any) => {
    setFruitBox(fruitBox.filter((fruit) => fruit !== fruitToDelete));
  };

  const onSubmit = (data: any) => {
    const { name } = data;
    if (fruits.includes(name)) {
      deleteFruit(name);
    }
    reset();
  };

  return (
    <>
      <Title>Fruit Box</Title>
      <FruitBox>
        {fruits.map((fruit) => (
          <Item key={fruit}>{fruit}</Item>
        ))}
      </FruitBox>
      <Containers>
        <Container>
          <Box>
            {fruitBox.slice(0, 5).map((fruit, index) => (
              <Item key={index}>{fruit}</Item>
            ))}
          </Box>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="입력하세요"
            />
            <button>제출</button>
          </Form>
        </Container>
        <Container>
          <Box>
            {fruitBox.slice(5).map((fruit, index) => (
              <Item key={index}>{fruit}</Item>
            ))}
          </Box>
          <Form>
            <input type="text" placeholder="입력하세요" />
            <button>제출</button>
          </Form>
        </Container>
      </Containers>
    </>
  );
}

export default Fruits;
