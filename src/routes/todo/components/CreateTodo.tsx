import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "./atoms";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    //배열 안의 요소를 반환
    setTodos((oldTodos) => [
      ...oldTodos,
      { text: todo, id: Date.now(), category },
    ]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("todo", {
          required: "pleas write a To Do",
        })}
        placeholder="write a to do"
      />
      <button>ADD</button>
    </form>
  );
}

export default CreateTodo;
