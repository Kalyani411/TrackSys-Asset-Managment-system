"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Furniture",
    subtitle: "Workspace essentials",
    href: "/user/Furniture",
    image: "/furniture.png",
    bg: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    title: "Electronics",
    subtitle: "IT & devices",
    href: "/user/Electronics",
    image: "/electronics.png",
    bg: "from-indigo-500/20 via-purple-500/10 to-transparent",
  },
];

export default function CategorySection() {
  return (
    <section className="mx-auto mt-8 max-w-6xl px-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Asset Categories</h2>
        <p className="text-sm text-gray-500">
          Browse company assets by category
        </p>
      </div>

      {/* Panels */}
      {categories.map((cat, i) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.bg} p-6`}
        >
          <div className="flex items-center justify-between gap-6">
            {/* Left content */}
            <div>
              <h3 className="text-xl font-semibold">{cat.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {cat.subtitle}
              </p>

              <Link
                href={cat.href}
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-black hover:underline"
              >
                Explore
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                />
              </Link>
            </div>

            {/* Image */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="shrink-0"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                width={90}
                height={90}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
