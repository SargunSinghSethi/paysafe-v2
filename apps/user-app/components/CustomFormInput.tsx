import { z } from "zod";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { formSchema } from "./AuthForm";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CustomFormInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomFormInput = ({
  control,
  name,
  label,
  placeholder
}: CustomFormInputProps) => {
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
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                className={`input-class `}
                type={(name === "password" && toggleEye) ? "password" : "tel"}
                pattern={name === "number" ? "\d{3}[\-]\d{3}[\-]\d{4}" : ""}
                {...field}
              />
            </FormControl>
              {name === "password" && (
                <div className="absolute right-0">
                  <button onClick={() =>setToggleEye(!toggleEye)}>
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