
"use client";

import { useState } from "react";
import { AssetFormType } from "@/types/type";
import { AssetStatus } from "@prisma/client";

interface AssetFormProps {
  defaultValues: AssetFormType;
  onSubmit: (form: AssetFormType) => Promise<void>;
}

export default function AssetForm({
  defaultValues,
  onSubmit,
}: AssetFormProps) {
  const [form, setForm] = useState<AssetFormType>(defaultValues);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(form);
      }}
      className="grid grid-cols-2 gap-4 mb-4"
    >
      <input
        className="border p-2"
        placeholder="Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2"
        placeholder="Code"
        required
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
      />

   <select
  className="border p-2"
  value={form.type}
  onChange={(e) =>
    setForm({
      ...form,
      type: e.target.value, // ✅ STRING
    })
  }
  required
>
  <option value="">Select Type</option>
  <option value="Furniture">Furniture</option>
  <option value="Electronics">Electronics</option>
</select>

      

      <input
        className="border p-2"
        placeholder="Location"
        required
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      {/* ✅ ENUM SAFE STATUS */}
      <select
        className="border p-2"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value as AssetStatus,
          })
        }
        required
      >
        <option value={AssetStatus.ACTIVE}>ACTIVE</option>
        <option value={AssetStatus.ASSIGNED}>ASSIGNED</option>
        <option value={AssetStatus.REPAIR}>REPAIR</option>
        {/* <option value={AssetStatus.RETURN}>RETURN</option> */}
      </select>

      {/* <input
        type="number"
        className="border p-2"
        placeholder="Value"
        required
        value={form.value}
        onChange={(e) =>
          setForm({ ...form, value: Number(e.target.value) })
        }
      /> */}

      <button className="col-span-2 bg-green-600 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
}
