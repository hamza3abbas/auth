"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/src/components/auth/card-wrapper"
import {BeatLoader} from "react-spinners"
import { useCallback ,useEffect ,useState} from "react";
import { newVerification } from "@/src/actions/new-verification";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
const NewVerificationFrom = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(()=>{
  
   if (!token){
    setError('Missing payload Data');
    return;
   }

   newVerification(token).then((data)=>{
    setSuccess(data.success);
    setError(data.error);
   }).catch(()=>{
    setError("Something Went Wrong");
   })
  },[token]);

  useEffect(()=>{
    onSubmit();
  },[onSubmit]);


  return (
  <CardWrapper
  headerLabel="Confirming your verification"
  backButtonLabel="Back to login"
  backButtonHref="/auth/login"
  >
    <div className="justify-center items-center flex w-full">
       {!success && !error && (
         <BeatLoader/>
       )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
    </div>
  </CardWrapper>
  );
};

export default NewVerificationFrom;