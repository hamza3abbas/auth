
"use client"

import { settings } from "@/src/actions/settings";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

const SettingsPage =  () => {
  const {update} = useSession();
  const [isPending,startTransition] = useTransition();
  const onClick = () => {
    startTransition(()=>{
      settings({
        name: "Something diffrent"
      });
    })
   
  }
 
  return (
   <Card className="w-[600px]">
    <CardHeader>
      <p className="text-2xl font-semibold text-center">
       ⚙️ Settings
      </p>
    </CardHeader>
    <CardContent>
      <Button disabled={isPending} onClick={onClick}>
        Update Name
      </Button>
    </CardContent>
   </Card>
  );
};

export default SettingsPage;