import Autocomplete from "../Autocomplete/AutoComplete";
import "./CreateQuestionForm.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../store/questions";
import { getCategories } from "../../store/questions";
import { getUsers } from "../../store/users";
import { useHistory } from "react-router-dom";

const CreateQuestionForm = ({ hideForm }) => {
  const users = useSelector((state) => state.users.list);
  const questionCategories = useSelector((state) => state.questions.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useSelector((state) => state.session);
  const [questionName, setQuestionName] = useState("");
  const [user1_id, setUser1_id] = useState(userId);
  const [user2_id, setUser2_id] = useState(0);
  const [question, setQuestion] = useState("");
  const [user1_response, setUser1_response] = useState("");
  const [user2_response, setUser2_response] = useState(null);
  const [user2_username, setUser2_username] = useState("");
  const [user1_upvotes, setUser1_upvotes] = useState(0);
  const [user2_upvotes, setUser2_upvotes] = useState(0);
  const [category_id, setCategory_id] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [complete, setComplete] = useState(false);
  const usernames = [];
  users.forEach((user) => {
    usernames.push(user.username);
  });
  const updateQuestionName = (e) => setQuestionName(e.target.value);
  // const updateUser1_id = (e) => setUser1_id(e.target.value);
  const updateUser2_id = (e) => setUser2_id(e.target.value);
  const updateQuestion = (e) => setQuestion(e.target.value);
  const updateUser1_response = (e) => setUser1_response(e.target.value);
  // const updateUser2_response = (e) => setUser2_response(e.target.value);
  // const updateUser1_upvotes = (e) => setUser1_upvotes(e.target.value);
  // const updateUser2_upvotes = (e) => setUser2_upvotes(e.target.value);
  const updateCategory_id = (e) => setCategory_id(e.target.value);
  const updateDeadline = (e) => setDeadline(e.target.value);
  // const updateComplete = (e) => setComplete(e.target.value);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      questionName,
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

    let createdQuestion;
    createdQuestion = await dispatch(createQuestion(newQuestion));
    if (createdQuestion) {
      history.push(`/questions/${createdQuestion.id}`);
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="new-form-holder-centered-middled">
      <form id="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          required
          value={questionName}
          onChange={updateQuestionName}
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={question}
          onChange={updateQuestion}
        />
        <Autocomplete suggestions={usernames} placeholder= "test"/>
        <input
          type="text"
          placeholder="Your Argument Here"
          required
          value={user1_response}
          onChange={updateUser1_response}
        />
        <select onChange={updateCategory_id}>
          {questionCategories.map((category) => (
            <option key={category.id}>{category.name}</option>
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
