import * as yup from 'yup';

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
    password: yup.string().required('Password não informado'),
  }),
});

export { userPost };
