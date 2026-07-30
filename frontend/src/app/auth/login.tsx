"use client";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const loginformSchema = z.object({
  email: z
    .string()
    .min(5, "Email is required")
    .email({ message: "Invalid Email address" }),
  password: z.string().min(6, "Password is required"),
});

type FormValues = z.infer<typeof loginformSchema>;

const Login = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginformSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted", data);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data,
      );
      console.log({ res });
      toast("login successful");
      router.push("/dashboard");
    } catch (errors) {
      console.error("Signup error", errors);
    }
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mb-10 md:mb-16">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
          Log In
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-lg grid  gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
          >
            Email*
          </label>
          <input
            type="text"
            {...register("email")}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
          />
        </div>
        {errors.email && (
          <p className="text-red-600">{errors.email.message as string}</p>
        )}

        <div className="sm:col-span-2">
          <label
            htmlFor="password"
            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
          />
        </div>
        {errors.password && (
          <p className="text-red-600">{errors.password.message as string}</p>
        )}

        <div className="flex items-center justify-between sm:col-span-2">
          <button
            type="submit"
            className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base cursor-pointer"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
