 import { Header } from "@/src/components/auth/header";
 import { BackButton } from "@/src/components/auth/back-button";
 import { Card,CardContent,CardDescription,CardFooter,CardHeader } from "@/src/components/ui/card";
import {FormError} from "@/src/components/form-error"
 export const ErrorCard = () => {
   return (
    <Card className="w-[400px] shadow-md ">
        <CardHeader>
              <Header label={''} 
              // sublabel="Please make sure to use the right 0auth provider"
              />
        </CardHeader>
        <CardContent className="items-center justify-items-center">
          <FormError message="Oops! Something Went Wring"/>
        </CardContent>
        <CardFooter>
             <BackButton label="Back to Login"  href="/auth/login"/>
        </CardFooter>
    </Card>
   );
 };
 
 