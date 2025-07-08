import React, { useCallback, useEffect } from "react";
import { data , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input";
import Dropdown from "../Dropdown";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import DBservice from "../../appwrite/appwriteConfig";

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
    
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await DBservice.uploadFile(data.image[0])
        : null;
      if (file) {
        DBservice.deleteFile(post.imageID);
      }
      const update = await DBservice.updatePost({
        ...data,
        slug: post.$id,
        imageID: file ? file.$id : undefined,
      });
      if (update) navigate(`/post/${update.$id}`);
    } else {
      const file = data.image[0]
        ? await DBservice.uploadFile(data.image[0])
        : null;
      if (file) {
        data.imageID = file.$id;
        const create = await DBservice.createPost({
          ...data,
          userID: userData?.$id,
        });
        if (create) navigate(`/post/${create.$id}`);
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {!post &&
          <Input
            label="Slug: "
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        }
        <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input label="Image: " type="file" className="mb-4" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image",{required:!post})} />
        {post && (
            <div className="w-full mb-4">
                <img src={DBservice.getFilePreview(post.imageID)} alt={post.title} className="rounded-lg" />
            </div>
        )}
        <Dropdown options={['active','inactive']} label='Status: ' className="mb-4" {...register("status",{required:true})} />
        <button type="submit" className={`w-auto px-4 py-2 rounded-lg hover:bg-green-600 ${post?"bg-green-400" : "bg-green-500"}`}>{post? "Update" : "Submit"}</button>
      </div>
    </form>
  );
}

export default PostForm;
