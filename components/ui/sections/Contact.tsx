"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className=" px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl text-center mb-8 md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white">
          Contact Me
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Name"
              required
              className="p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            name="subject"
            placeholder="Subject"
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            required
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-500 text-center">Message sent!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-center">
              Error sending message. Try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
