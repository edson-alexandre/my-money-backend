import * as yup from 'yup';
import { TestContext } from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const idParamsSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid('Não é um UUID válido').required('O ID deve ser informado como parâmetro'),
  }),
});

const supplyerPost = yup.object({
  body: yup.object({
    name: yup.string().required('Nome não informado'),
    email: yup.string().required('E-mail não informado').email('E-mail inválido'),
    personType: yup.string().oneOf(['FISICA', 'JURIDICA'], `O campo deve preenchido com 'FISICA' OU 'JURIDICA'`),
    cgcCpf: yup
      .string()
      .required('CNPJ / CPF Não informado')
      .test((cgcCpf: string, schema: TestContext) => {
        if (schema?.parent?.personType === 'FISICA' && !cpf.isValid(cgcCpf)) {
          return schema.createError({ message: 'CPF inválido' });
        } else if (schema?.parent?.personType === 'JURIDICA' && !cnpj.isValid(cgcCpf)) {
          return schema.createError({ message: 'CPF inválido' });
        } else {
          return true;
        }
      }),
    contact: yup.string().nullable(true),
    city: yup.string().required('Cidade não informada'),
    state: yup
      .string()
      .min(2, 'O campo deve possuir dois caracteres')
      .max(2, 'O campo deve possuir dois caracteres')
      .required('Estado não informado'),
    street: yup.string().required('Rua não informada'),
    number: yup.string().required('Número do endereço'),
    details: yup.string(),
    district: yup.string().required('Bairro não informado'),
    zip: yup.string().required('CEP não informado').max(8, 'Tamanho máximo para o CEP são 8 caracteres'),
    country: yup.string().required('País não informado'),
  }),
});

const supplyerPut = yup.object({
  body: yup.object({
    id: yup.string().uuid('O ID não é um UUID válido').required('ID não informado no corpo da requisição'),
    name: yup.string().required('Nome não informado'),
    email: yup.string().required('E-mail não informado').email('E-mail inválido'),
    personType: yup.string().oneOf(['FISICA', 'JURIDICA'], `O campo deve preenchido com 'FISICA' OU 'JURIDICA'`),
    cgcCpf: yup
      .string()
      .required('CNPJ / CPF Não informado')
      .test((cgcCpf: string, schema: TestContext) => {
        if (schema?.parent?.personType === 'FISICA' && !cpf.isValid(cgcCpf)) {
          return schema.createError({ message: 'CPF inválido' });
        } else if (schema?.parent?.personType === 'JURIDICA' && !cnpj.isValid(cgcCpf)) {
          return schema.createError({ message: 'CPF inválido' });
        } else {
          return true;
        }
      }),
    contact: yup.string().nullable(true),
    city: yup.string().required('Cidade não informada'),
    state: yup
      .string()
      .min(2, 'O campo deve possuir dois caracteres')
      .max(2, 'O campo deve possuir dois caracteres')
      .required('Estado não informado'),
    street: yup.string().required('Rua não informada'),
    number: yup.string().required('Número do endereço'),
    details: yup.string(),
    district: yup.string().required('Bairro não informado'),
    zip: yup.string().required('CEP não informado'),
    country: yup.string().required('País não informado'),
  }),
});

export { supplyerPost, supplyerPut, idParamsSchema };
