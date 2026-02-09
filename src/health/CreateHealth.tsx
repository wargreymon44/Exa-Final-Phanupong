import { useForm } from "react-hook-form";
import FieldInput from "../component/FieldInput.tsx"
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../config/axios.config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { healthSchema, type HealthSchema } from "../schema/health.schema.ts";

export default function CreateHealth() {
  const navigate = useNavigate();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(healthSchema),
    defaultValues: {
      note: "",
      type: "",
      unit: '',
      value: '',
    },
  });
console.log('errors', errors)
  const onSubmit = async (data: HealthSchema) => {
    try {
      await axiosInstance.post("/healt-records/create", data);
      toast.success("register successful");
      navigate("/healt-records");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
        setError('note', { message });
        return;
      }
      toast.error("create error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-gray-200 ">
        <div className="text-2xl">สร้างบันทึกสุขภาพใหม่</div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
            label="ประเภท (Type)"
            error={errors.note?.message}
            {...register("note")}
            placeholder="เช่น BloodPressure, Heart Rate"
          />
          <FieldInput
            label="ค่า (Value)"
            error={errors.type?.message}
            {...register("type")}
            placeholder="เช่น 120/82, 72"
          />
          <FieldInput
            label="หน่วย (Unit)"
            error={errors.unit?.message}
            {...register("unit")}
            placeholder="เช่น mmHg, Bpm"
          />
          <FieldInput
            label="หมายเหตุ (Note)"
            error={errors.value?.message}
            {...register("value")}
            placeholder="กรอกหมายเหตุเพิ่มเติม"
          />
       <button className="mx-auto w-60 bg-blue-600">{isSubmitting ? "loading ... " : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}
