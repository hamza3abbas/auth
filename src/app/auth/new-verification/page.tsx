import NewVerificationFrom from "@/src/components/auth/new-verification-form"
import { Suspense } from "react"

const NewVerification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <NewVerificationFrom/>
    </Suspense>
  );
};

export default NewVerification; 