import Autocomplete from "../Autocomplete/AutoComplete";
import "./CreateQuestionForm.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../store/questions";
import { getCategories } from "../../store/questions";
import { getUsers } from "../../store/users";
import { useHistory } from "react-router-dom";
import { set } from "js-cookie";

const CreateQuestionForm = ({showModal, changeStateFunc}) => {
  const users = useSelector((state) => state.users.list);
  const questionCategories = useSelector((state) => state.questions.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId  = useSelector((state) => state.session.user.id);

  const [question_name, setQuestionName] = useState("");
  const [user1_id, setUser1_id] = useState(userId);
  const [user2_id, setUser2_id] = useState(1);
  const [question, setQuestion] = useState("");
  const [user1_response, setUser1_response] = useState("");
  const [user2_response] = useState("");
  const [user2_username, setUser2_username] = useState("");
  const [user1_upvotes] = useState(0);
  const [user2_upvotes] = useState(0);
  const [category_id, setCategory_id] = useState(1);
  const [deadline, setDeadline] = useState(new Date());
  const [complete] = useState(false);
  const usernames = [];
  users.forEach((user) => {
    usernames.push(user.username);
  });
  const updateQuestionName = (e) => setQuestionName(e.target.value);
  const updateUser2_username =(acInput) =>{
    setUser2_username(acInput)
  }
  const updateUser2_id = (e) => setUser2_id(e.target.value);
  const updateQuestion = (e) => setQuestion(e.target.value);
  const updateUser1_response = (e) => setUser1_response(e.target.value);
  const updateCategory_id = (e) => setCategory_id(e.target.value);
  const updateDeadline = (e) => setDeadline(e.target.value);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(async()=>{
    const opponent = await users.find(user=>user.username === user2_username)
    setUser2_id(opponent?.id)
  },[user2_username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser1_id(userId)
    const newQuestion = {
      question_name,
      user1_id,
      user2_id,
      question,
      user1_response,
      user2_response,
      user1_upvotes,
      user2_upvotes,
      category_id,
      deadline,
      complete,
    };

    const createdQuestion = dispatch(createQuestion(newQuestion));
    if (createdQuestion) {
      history.push(`/`);
      showModal(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    showModal(false);
  };

  return (
    <section className="new-form-holder-centered-middled">
      <form id="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          required
          value={question_name}
          onChange={updateQuestionName}
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={question}
          onChange={updateQuestion}
        />
        <Autocomplete suggestions={usernames} placeholder= "Enter your opponents username" changeStateFunc={updateUser2_username}/>
        <input
          type="text"
          placeholder="Your Argument Here"
          required
          value={user1_response}
          onChange={updateUser1_response}
        />
        <select onChange={updateCategory_id}>
          {questionCategories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={updateDeadline}
        />
        <button type="submit">Create New Question</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default CreateQuestionForm;
