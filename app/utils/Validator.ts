import * as yup from 'yup';
type ValidationResult<T> = { error?: string; values?: T }
export const yupValidate = async <T extends object>(
    schema: yup.Schema, value: T):
    Promise<ValidationResult<T>> => {
    try {
        const data = await schema.validate(value)
        return { values: data }

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return { error: error.message }
        } else {
            return { error: (error as any).message };
        }

    }

};
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
yup.addMethod(yup.string, 'email', function (message) {
  return this.matches(emailRegex, {
    message: message || 'Invalid email format',
    name: 'email',
    excludeEmptyString: true,
  });
});

export const newProductSchema = yup.object({
    name: yup.string().required("Product Name is missing!"),
    description: yup.string().required("Product description is missing!"),
    price: yup.string()
    .transform((value) =>{
        if (isNaN(+value)) return "";
        return +value;
    })
    .required("Product price is missing!"),
    purchasingDate: yup.date().required("Purchasing date is missing!"),
});
