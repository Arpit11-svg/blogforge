import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues,formState: { errors }, } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(userData);
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {post ? "Edit Blog" : "Create New Blog"}
        </h1>

        <p className="text-gray-500 mt-2">
          Share your thoughts with the BlogForge community.
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            disabled
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          {errors.content && (
            <p className="text-red-600 text-xl mt-1">
              {errors.content.message}
            </p>
          )}
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full lg:w-4/12 px-2 mt-6 lg:mt-0">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full h-48 object-cover border"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="inline-block mb-1 pl-1 font-medium">Status</label>

            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
              {...register("status")}
            >
              <option value="active">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="inline-block mb-1 pl-1 font-medium">
              Category
            </label>

            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
              defaultValue={post?.category || ""}
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">Select Category</option>

              <option value="technology">Technology</option>
              <option value="programming">Programming</option>
              <option value="artificial-intelligence">
                Artificial Intelligence
              </option>
              <option value="business-finance">Business & Finance</option>
              <option value="education">Education</option>
              <option value="health-fitness">Health & Fitness</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="science">Science</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="mb-5 p-4 bg-blue-50 rounded-xl border">
            <p className="text-sm text-gray-500">Author</p>

            <p className="font-semibold text-lg">{userData?.name}</p>
          </div>

          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full py-3 text-lg font-semibold transition-transform hover:scale-[1.02]"
            disabled={!userData}
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
