import React, { Fragment } from "react";
import { useAlert } from "react-alert";

import Loader from "./components/Loader/Loader";
const Test = () => {
	const alert = useAlert();
	return <Loader />;
};

export default Test;
