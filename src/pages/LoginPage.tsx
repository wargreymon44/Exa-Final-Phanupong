import { useForm } from "react-hook-form";
import FieldInput from "../component/FieldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type Loginschema } from "../schema/auth.schema";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/user.store";

export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()
  const {
    setError,
    register,
    handleSubmit,
    formState : {errors , isSubmitting },
  } = useForm ({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const onSubmit = async (data: Loginschema) => {
    try {
      const res = await axiosInstance.post('/auth/login', data)
      const user = {userId: res.data.userId}
      const accessToken = res.data.accesToken
      setAuth(user,accessToken)

      toast.success('login successful')
      navigate('/health-records')
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message
        toast.error(message)
        setError('username', {message})
        return
      }
      toast.error('login error')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200">
        <div className="text-2xl flex flex-col justify-center">เข้าสู่ระบบ</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
          label="UserName"
          error={errors.username?.message}
          {...register('username')}
           placeholder ="กรอก username"
          />
            <FieldInput
          label="Password"
          error={errors.password?.message}
          {...register('password')}
           placeholder="กรอก password"
          />
          <button className="mx-auto w-60 bg-blue-600">{isSubmitting ? 'loading...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  )
}
