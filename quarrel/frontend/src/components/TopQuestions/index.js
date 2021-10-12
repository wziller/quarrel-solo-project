import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getQuestions } from "../../store/questions";
import "./index.css";

function TopQuestions() {
 return (
     <h1>Top Questions</h1>
 )
}

export default TopQuestions;
