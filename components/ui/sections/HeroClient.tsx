"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function HeroClient({ profileData }: { profileData: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center mt-10 md:mt-16 px-6 md:px-16 py-10"
    >
      <div className="flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start">
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
            {profileData.headline}
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-gray-600 max-w-[600px] leading-relaxed text-justify md:text-left"
        >
          {profileData.shortBio}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-2 md:gap-4 pt-4 w-full max-w-sm lg:max-w-none"
        >
          {profileData.stats?.map((stat: any) => (
            <div
              key={stat._key}
              className="flex flex-col items-center lg:items-start"
            >
              <span className="text-xl md:text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto"
        >
          <Link
            href={profileData.socialLinks?.github || "#"}
            className="px-8 py-3 bg-black text-white rounded-full hover:scale-105 transition-transform text-center z-20 shadow-lg"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            href={profileData.socialLinks?.linkedin || "#"}
            className="px-8 py-3 bg-[#0077b5] text-white rounded-full hover:scale-105 transition-transform text-center z-20 shadow-lg"
            target="_blank"
          >
            LinkedIn
          </Link>
          <a
            href={`mailto:${profileData.email}`}
            className="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-200 transition-all text-center z-20"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="relative flex justify-center items-center order-first lg:order-0 mb-4 lg:mb-0"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] bg-linear-to-tr from-blue-500 to-purple-500 rounded-full blur-[60px] md:blur-[80px] absolute z-0"
        />

        <div className="relative group z-10">
          {profileData.profileImage ? (
            <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] relative">
              <Image
                src={urlFor(profileData.profileImage)
                  .width(600)
                  .height(600)
                  .url()}
                alt={`${profileData.firstName} profile`}
                fill
                className="rounded-full mt-6 md:mt-2 object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/20"
                priority
              />
            </div>
          ) : (
            <div className="relative p-6 md:p-8 bg-zinc-900/90 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl font-mono text-xs md:text-sm text-blue-400">
              <p className="text-zinc-500 mb-2">// Software Engineer Profile</p>
              <p>
                <span className="text-purple-400">const</span> engineer = {"{"}
              </p>
              <p className="ml-4">
                name:{" "}
                <span className="text-green-400">
                  "{profileData.firstName}"
                </span>
                ,
              </p>
              <p className="ml-4">
                status: <span className="text-green-400">"Available"</span>,
              </p>
              <p className="ml-4">
                location:{" "}
                <span className="text-green-400">"{profileData.location}"</span>
              </p>
              <p>{"}"}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
