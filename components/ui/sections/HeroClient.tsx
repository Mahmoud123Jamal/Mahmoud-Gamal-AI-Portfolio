"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function HeroClient({ profileData }: { profileData: any }) {
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

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-16 px-16"
    >
      {/* Left Side: Content */}
      <div className="flex flex-col space-y-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
            {profileData.headline}
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 max-w-[600px] leading-relaxed"
        >
          {profileData.shortBio}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 pt-4"
        >
          {profileData.stats?.map((stat: any) => (
            <div key={stat._key} className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-6"
        >
          <Link
            href={profileData.socialLinks?.github || "#"}
            className="px-6 py-3 bg-black text-white rounded-full hover:scale-105 transition-transform text-center z-20"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            href={profileData.socialLinks?.linkedin || "#"}
            className="px-6 py-3 bg-[#0077b5] text-white rounded-full hover:scale-105 transition-transform text-center z-20"
            target="_blank"
          >
            LinkedIn
          </Link>
          <a
            href={`mailto:${profileData.email}`}
            className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-all text-center z-20"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Right Side: Image/Card */}
      <motion.div
        variants={itemVariants}
        className="relative flex justify-center items-center"
      >
        {/* Animated Glow behind image */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-linear-to-tr from-blue-500 to-purple-500 rounded-full blur-[80px] absolute z-0"
        />

        <div className="relative group z-10">
          {profileData.profileImage ? (
            <Image
              src={urlFor(profileData.profileImage)
                .width(500)
                .height(500)
                .url()}
              alt={`${profileData.firstName} profile`}
              width={400}
              height={400}
              className="rounded-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/20"
              priority
            />
          ) : (
            <div className="relative p-8 bg-zinc-900 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl font-mono text-sm text-blue-400">
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
                status:{" "}
                <span className="text-green-400">"Available for Work"</span>,
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
