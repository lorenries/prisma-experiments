import { useField } from "formik";
import { Label, Input, Box } from "@theme-ui/components";

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box
      sx={{
        pb: 3
      }}
    >
      <Label
        htmlFor={props.name}
        sx={{
          pb: 2
        }}
      >
        {label}
      </Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Box>
  );
};

export default FormInput;
