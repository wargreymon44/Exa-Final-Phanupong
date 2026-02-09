import { useForm } from "react-hook-form";
import FieldInput from "../component/FieldInput.tsx"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../schema//auth.schema";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
console.log('errors', errors)
  const onSubmit = async (data: RegisterSchema) => {
    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("register successful");
      navigate("/auth/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
        setError("username", { message });
        return;
      }
      toast.error("register error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-gray-200 ">
        <div className="text-2xl">สมัครสมาชิก</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
            label="Username"
            error={errors.username?.message}
            {...register("username")}
          />
          <FieldInput
            label="Password"
            error={errors.password?.message}
            {...register("password")}
          />

      <label className='S flex flex-col justify-center items-center'>
        เลือก Role:
        <select name="selectedRole" defaultValue="doctor">
          <option value="apple">PATIENT</option>
          <option value="banana">Doctor</option>
        </select>
      </label>
       <button className="mx-auto w-60 bg-blue-600">{isSubmitting ? "loading ... " : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}
