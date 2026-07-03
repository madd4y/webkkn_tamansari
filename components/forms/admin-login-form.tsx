"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().trim().email("Email tidak valid."),
  password: z.string().min(1, "Password wajib diisi."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setErrorMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setErrorMessage(
        response.status === 401
          ? "Email atau password salah."
          : "Login gagal. Periksa konfigurasi environment variables.",
      );
      return;
    }

    const nextUrl = searchParams.get("next") ?? "/admin/dashboard";

    router.replace(nextUrl.startsWith("/admin") ? nextUrl : "/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
      <label className="block">
        <span className="text-sm font-semibold text-zinc-700">Email</span>
        <span className="relative mt-2 block">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
            aria-hidden="true"
          />
          <input
            type="email"
            autoComplete="email"
            placeholder="admin@example.com"
            className="h-12 w-full rounded-md border border-zinc-200 bg-white pl-10 pr-3 text-sm text-zinc-950 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            {...register("email")}
          />
        </span>
        {errors.email ? (
          <span className="mt-2 block text-sm font-medium text-red-600">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-zinc-700">Password</span>
        <span className="relative mt-2 block">
          <LockKeyhole
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
            aria-hidden="true"
          />
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan password admin"
            className="h-12 w-full rounded-md border border-zinc-200 bg-white pl-10 pr-12 text-sm text-zinc-950 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </span>
        {errors.password ? (
          <span className="mt-2 block text-sm font-medium text-red-600">
            {errors.password.message}
          </span>
        ) : null}
      </label>

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <Button type="submit" className="h-12 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
}
