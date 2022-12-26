import * as yup from 'yup';

const cepParamsSchema = yup.object({
  params: yup.object({
    cep: yup
      .string()
      .required('CEP não informado')
      .matches(/^[0-9]+$/, 'Devem ser informados apenas números')
      .min(8, 'O campo CEP deve contar oito caracteres numéricos com zeros a esquerda')
      .max(8, 'O campo CEP deve contar oito caracteres numéricos com zeros a esquerda'),
  }),
});

export { cepParamsSchema };
