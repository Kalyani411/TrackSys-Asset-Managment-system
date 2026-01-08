"use client";

import { useForm } from "react-hook-form";
import { AssetFormType } from "@/types/type";
import { AssetStatus } from "@prisma/client";
import { useTransition } from "react";

type Props = {
  defaultValues: AssetFormType;
  onSubmit: (data: AssetFormType) => Promise<void>;
};

export default function AssetForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetFormType>({
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const submitHandler = (data: AssetFormType) => {
    startTransition(() => {
      onSubmit(data);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-6">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

      
        <div>
          <label className="block text-sm font-medium mb-1">
            Asset Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Laptop Dell XPS"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">
            Asset Code
          </label>
          <input
            {...register("code", { required: "Code is required" })}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="AST-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Asset Type
          </label>
          <input
            {...register("type", { required: "Type is required" })}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Electronics"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="IT Store Room"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">
            Asset Value
          </label>
          <input
            type="number"
            {...register("value", { valueAsNumber: true })}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="50000"
          />
        </div>

    
        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full rounded-lg border px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {Object.values(AssetStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

       
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Asset"}
        </button>
      </form>
    </div>
  );
}
