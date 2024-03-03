"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );
    router.push(url);
    reset();
  };
  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        autoComplete="off"
        type="text"
        placeholder="Explore E-shop"
        className="p-2 border border-gray-300 
    rounded-l-md focus:outline-none w-80 
focus:border-slate-500 
focus:border-[0.5px]"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-700 
hover:opacity-80 text-white p-2 
rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
