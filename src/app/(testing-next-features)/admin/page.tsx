"use client";

import { RoleGate } from "@/src/components/auth/role-gate";
import { FormSuccess } from "@/src/components/form-success";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
    const onApiRouteCLick = () => {
        fetch('/api/admin').then((response) => {
            if(response.ok){
                toast.success("API ALLOWED ROUTE!");
            }else{
                toast.error ("API FORBIDDEN ROUTE!");

            }
        })
    }
   
  return (
   <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                🔑 Admin
            </p>
        </CardHeader>
        <CardContent className="space-y-4   ">
            <RoleGate   allowedRole={UserRole.ADMIN} >
                <FormSuccess message="You're Admin"/>
            </RoleGate>
            <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="font-medium text-sm ">
                Admin-only API Route  
                </p>
                <Button onClick={onApiRouteCLick}>
                    Click To Test
                </Button>
            </div>
            <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p className="font-medium text-sm ">
                Admin-only Server Action  
                </p>
                <Button>
                    Click To Test
                </Button>
            </div>
        </CardContent> 
   </Card>
  );
};

export default AdminPage ;