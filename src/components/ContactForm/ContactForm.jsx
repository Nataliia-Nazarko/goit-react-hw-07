import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const initialValues = {
  name: "",
  number: "",
};

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters!")
    .max(50, "Name must be less than 50 characters!")
    .required("Name is required!"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, {
      message: "Invalid number",
      excludeEmptyString: false,
    })
    .required("Number is required!"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const onFormSubmit = (formData, formAct) => {
    const newContact = {
      ...formData,
      id: nanoid(),
    };

    dispatch(addContact(newContact));
    formAct.resetForm();
  };

  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <div>
          <label>Name</label>
          <Field id={nameId} type="text" name="name" placeholder="Anna Freid" />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errorMessage}
          />
        </div>
        <div>
          <label>Number</label>
          <Field
            id={numberId}
            type="tel"
            name="number"
            placeholder="359-65-32"
          />
          <ErrorMessage
            name="number"
            component="span"
            className={css.errorMessage}
          />
        </div>
        <button type="submit" className={css.addBtn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
