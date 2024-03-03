"use client";
import { IoIosSend } from "react-icons/io";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/products/Button";
import Heading from "@/app/components/products/Heading";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[]
  };
  user:(SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No rating selected");
    }
    const ratingData = { ...data, userId: user?.id, product: product };
   
   
    axios.post('/api/rating', ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Sorry, but you've already posted your review.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
 if (!user || !product) return null;


  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />

      <div>
        <Rating
          onChange={(event, newValue) => {
            setCustomValue('rating', newValue);
          }}
        />
        <Input
          id='comment'
          label="Comment"
          disabled={isLoading}
          errors={errors}
          required
          register={register}
        />
      </div>
      <Button
        icon={IoIosSend}
        label={isLoading ? "Loading" : 'Rate Product'}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
