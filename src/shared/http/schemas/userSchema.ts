import * as yup from 'yup';
import { TestContext } from 'yup';

// const linkSchema = yup.object({
//   body: yup.object({
//     url: yup.string().url().required(),
//     title: yup.string().min(8).max(32).required(),
//     content: yup.string().min(8).max(255).required(),
//     contact: yup.string().email().required(),
//   }),
//   params: yup.object({
//     id: yup.number().required(),
//   }),
// });

const userPost = yup.object({
  body: yup.object({
    name: yup.string().required('Nome não informado'),
    email: yup.string().required('E-mail não informado').email('E-mail inválido'),
    password: yup.string().required('Senha não informada'),
    confirmPassword: yup
      .string()
      .required('Confirmação de senha não informada')
      .test((confirmPassword: string, schema: TestContext) => {
        if (schema?.parent?.password !== confirmPassword) {
          return schema.createError({ message: 'As senhas não são iguais' });
        } else {
          return true;
        }
      }),
  }),
});

const userSignin = yup.object({
  body: yup.object({
    email: yup.string().required('E-mail não informado').email('E-mail inválido'),
    password: yup.string().required('Senha não informada'),
  }),
});

export { userPost, userSignin };
