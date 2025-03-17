import { useState, useCallback } from 'react';

type FieldValue = string | number | boolean | null;

type Validator<T> = (value: T) => string | null;

interface UseFormOptions<T extends Record<string, FieldValue>> {
   defaultValues: T;
   validators?: {
      [K in keyof T]?: Validator<T[K]>;
   };
}

interface UseFormReturn<T extends Record<string, FieldValue>> {
   values: T;
   errors: Partial<Record<keyof T, string>>;
   register: <K extends keyof T>(
      field: K,
   ) => {
      value: T[K];
      onChange: (
         e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
         >,
      ) => void;
   };
   reset: VoidFunction;
   handleSubmit: (
      callback: (data: T) => void,
   ) => (e: React.FormEvent<HTMLFormElement>) => void;
}

export function useForm<T extends Record<string, FieldValue>>(
   options: UseFormOptions<T>,
): UseFormReturn<T> {
   const {
      defaultValues,
      validators = {} as { [K in keyof T]?: Validator<T[K]> },
   } = options;

   const [values, setValues] = useState<T>(defaultValues);
   const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

   const validate = useCallback(
      <K extends keyof T>(fieldName: K, value: T[K]): string | null => {
         const validator = validators[fieldName];
         if (!validator) return null;
         return validator(value);
      },
      [validators],
   );

   const setValue = useCallback(
      <K extends keyof T>(field: K, value: T[K]) => {
         setValues(prev => ({ ...prev, [field]: value }));

         const error = validate(field, value);
         if (error) {
            setErrors(prev => ({ ...prev, [field]: error }));
         } else {
            setErrors(prev => {
               const newErrors = { ...prev };
               delete newErrors[field];
               return newErrors;
            });
         }
      },
      [validate],
   );

   const register = useCallback(
      <K extends keyof T>(field: K) => {
         return {
            value: values[field],
            onChange: (
               e: React.ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
               >,
            ) => {
               let newValue: T[K];

               const target = e.target;
               if (target.type === 'checkbox') {
                  newValue = (target as HTMLInputElement)
                     .checked as unknown as T[K];
               } else if (target.type === 'number' || target.type === 'range') {
                  newValue = Number(target.value) as unknown as T[K];
               } else {
                  newValue = target.value as unknown as T[K];
               }

               setValue(field, newValue);
            },
         };
      },
      [values, setValue],
   );

   const reset = useCallback(() => {
      setValues(defaultValues);
      setErrors({});
   }, [defaultValues]);

   const handleSubmit = useCallback(
      (callback: (data: T) => void) =>
         (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Проверка на наличие ошибок
            const newErrors: Partial<Record<keyof T, string>> = {};
            (Object.keys(values) as (keyof T)[]).forEach(field => {
               const error = validate(field, values[field]);
               if (error) newErrors[field] = error;
            });

            setErrors(newErrors);

            // Вызываем callback, если ошибок нет
            if (Object.keys(newErrors).length === 0) {
               callback(values);
            }
         },
      [values, validate],
   );

   return {
      values,
      errors,
      register,
      reset,
      handleSubmit,
   };
}
