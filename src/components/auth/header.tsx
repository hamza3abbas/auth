import { poppins } from "@/src/lib/fonts";

import { cn } from "@/src/lib/utils";

const font = poppins;

interface CardHeaderProps {
    label: string;
    sublabel? : string;
}

export const Header = ({ label ,sublabel = '' }: CardHeaderProps) => {
    return ( <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
            {label}
        </h1>
        {
            sublabel && (
                <p className="text-sm text-muted-foregroundr">
                {sublabel}
            </p>
            )
        }
    </div>)
}  