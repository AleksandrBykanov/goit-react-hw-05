import css from "./FormSearch.module.css";
import { Formik, Form, Field } from "formik";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css";

const FormSearch = ({ search }) => {
  const handleSubmit = (values) => {
    if (values.search.trim() === "") {
      iziToast.error({
        position: "center",
        message: "Please, enter search word!",
      });
      return;
    }
    search(values);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={{ search: "" }}>
      <Form className={css.form}>
        <Field
          className={css.field}
          name="search"
          type="text"
          placeholder="search movie"
          required
        />
        <button className={css.btn} type="submit">Search Movies</button>
      </Form>
    </Formik>
  );
};

export default FormSearch;
