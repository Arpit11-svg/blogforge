import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { useForm } from "react-hook-form";

function SupportForm() {
  const [searchParamas] = useSearchParams();
  const type = searchParamas.get("type");
  const supportConfig = {
    contact: {
      heading: "Contact Us",
      description: "Need help? Send us your query.",
      subject: "",
    },
    feedback: {
      heading: "Submit Feedback",
      description: "Help us to improve BlogForge.",
      subject: "Feedback",
    },
    issue: {
      heading: "Report an Issue",
      description: "Tell us what went wrong.",
      subject: "Bug Report",
    },
    
  };
  const current = supportConfig[type] || supportConfig["contact"];
  useEffect(()=>{
    setValue("subject", current.subject)
  },[current]);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { status, userData } = useSelector((state) => state.auth);

  const support = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await appwriteService.createSupportTicket({
        name: userData.name,
        email: userData.email,
        subject: data.subject,
        message: data.message,
        userId: userData?.$id,
      });

      if (response) alert("Support request submitted Successfully.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  if (status && !userData) {
    return <div className="text-center py-10">Loading user information...</div>;
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 text-center">
          <Logo width="100px" />

          <h2 className="mt-4 text-2xl font-bold">Login Required</h2>

          <p className="mt-2 text-black/60">
            You must be logged in to contact support.
          </p>

          <Link
            to="/login"
            className="inline-block mt-6 text-blue-600 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight p-2">
          {current.heading || "Contact Us"}
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          {current.description}
        </p>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(support)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name: "
              defaultValue={userData?.name}
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            <Input
              label="Email: "
              defaultValue={userData?.email}
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            <Input
              label="Subject: "
              type="text"
              {...register("subject", {
                required: "Subject is required",
              })}
            />

            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}

            <div>
              <label className="inline-block mb-1 pl-1 font-medium">
                Message:
              </label>

              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="6"
                placeholder="🖋️ Describe your issue in detail..."
                {...register("message", {
                  required: "Message is required",
                })}
              />
            </div>

            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupportForm;
