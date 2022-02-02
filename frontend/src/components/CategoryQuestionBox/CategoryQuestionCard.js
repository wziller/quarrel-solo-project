import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CategoryQuestionCard = ({ question }) => {
    const users = useSelector((state) => state.users.list);
  return (
    <div className={`questionOutermostContainer`} key={question.id}>
      <NavLink to={`/questions/${question.id}`}>
        <div key={question.id} className="questionCard">
          <h3>{question.question_name}</h3>
          <h4 id="descriptiontitle">Question Description</h4>
          <p>{question.question}</p>
          <div className="responses">
            <div className="user_1Response">
              <p>{`${
                users?.find((user) => user.id === question.user1_id)?.username
              } argues:`}</p>
              {question.user1_response}
            </div>
            <div className="user_2Response">
              <p>{`${
                users?.find((user) => user.id === question.user2_id)?.username
              } argues:`}</p>
              {question.user2_response}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default CategoryQuestionCard
