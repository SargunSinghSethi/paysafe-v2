import { z } from "zod";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = authFormSchema('sign-up');

interface CustomFormInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  loading: boolean;
}

const CustomFormInput = ({
  control,
  name,
  label,
  placeholder,
  loading
}: CustomFormInputProps) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [toggleEye, setToggleEye] = useState(true);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex flex-col w-full relative">
            <FormControl>
              <Input
                onInput={() => setIsEmpty(false)}
                placeholder={placeholder}
                className="input-class -mb-2"
                type={(name === "password" && toggleEye) ? "password" : name === "dateOfBirth" ? "date" : "text"}
                // type={(name === "password" && toggleEye) ? "password" : "text"}
                {...field}
                autoComplete="off"
                disabled={loading}
                />
            </FormControl>
            {(name === "password" && !isEmpty) && (
              <div className="absolute right-0 mt-2.5 mr-2">
                <button 
                onClick={() => setToggleEye(!toggleEye)}
                disabled={loading}
                >
                  {toggleEye ?
                    <Eye className="h-5 w-5 text-gray-500" />
                    : <EyeOff className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            )}
          </div>
          <FormMessage className="form-message ml-2 mt-2" />
        </div>
      )}
    />
  )
}

export default CustomFormInput;